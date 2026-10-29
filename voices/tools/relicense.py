"""Rewrites the credit lines (license=, source=) in .qbvoice files; everything else is copied as is.

    python3 relicense.py <in-dir> <out-dir>

The credits come from each voice's Piper model card (huggingface.co/rhasspy/piper-voices):
the recordings' licence, and the voice it was fine-tuned from where that matters.
"""
import os, sys, zipfile

LESSAC = "Built on the Piper lessac voice, whose recordings are licensed for research use only"
PIPER = "https://huggingface.co/rhasspy/piper-voices"
CREDITS = {
    "kristin": ("Public domain recordings (LibriVox); voice by Bryce Beattie, trained from scratch", "en_US-kristin-medium"),
    "norman": ("Public domain recordings (LibriVox); voice by Bryce Beattie, trained from scratch", "en_US-norman-medium"),
    "joe": ("Recordings CC0 (OHF-Voice). " + LESSAC, "en_US-joe-medium"),
    "ald": ("Recordings public domain (Unlicense; Ald Mexican Spanish dataset). Built on the Piper davefx voice, "
            "itself built on lessac, whose recordings are licensed for research use only", "es_MX-ald-medium"),
    "sharvard": ("Recordings CC BY 3.0: Sharvard Corpus, Aubanel, García Lecumberri & Cooke "
                 "(datashare.ed.ac.uk/handle/10283/574). " + LESSAC, "es_ES-sharvard-medium"),
    "siwis": ("Recordings CC BY 4.0: SIWIS French Speech Synthesis Database "
              "(datashare.is.ed.ac.uk/handle/10283/2353). " + LESSAC, "fr_FR-siwis-medium"),
    "pierre": ("Recordings CC BY-SA 4.0: UPMC Pierre voice data, MaryTTS (github.com/marytts/upmc-pierre-data); "
               "this voice is shared under the same terms. " + LESSAC, "fr_FR-upmc-medium"),
    "vais": ("Recordings CC BY 4.0: VAIS-1000 Vietnamese speech synthesis corpus (ieee-dataport.org). " + LESSAC,
             "vi_VN-vais1000-medium"),
    "faber": ("Recordings CC0 (OHF-Voice). " + LESSAC, "pt_BR-faber-medium"),
    "dmitri": ("Recordings CC0 (OHF-Voice). " + LESSAC, "ru_RU-dmitri-medium"),
    "chaowen": ("Recordings CC0 (OHF-Voice). Built on the Xiao Ya voice, whose recordings are for non-commercial use only",
                "zh_CN-chaowen-medium"),
    "xiaoya": ("Recordings for non-commercial use only (DataBaker Chinese Standard Mandarin Speech Corpus)",
               "zh_CN-xiao_ya-medium"),
    "kareem": ("Not stated by the voice's makers (github.com/AliMokhammad/arabicttstrain)", "ar_JO-kareem-medium"),
    "irina": ("Not stated by the voice's makers (recordings from the RHVoice project, github.com/RHVoice/RHVoice)",
              "ru_RU-irina-medium"),
}


def relicense(src, dst):
    zin = zipfile.ZipFile(src)
    lines = zin.read("voice.properties").decode("utf-8").splitlines()
    vid = next(l.split("=", 1)[1] for l in lines if l.startswith("id="))
    lic, model = CREDITS[vid]
    lines = [l for l in lines if not l.startswith(("license=", "source="))]
    lines += [f"source=Piper {model}, {PIPER}", f"license={lic}"]
    with zipfile.ZipFile(dst, "w") as zout:
        for info in zin.infolist():
            data = ("\n".join(lines) + "\n").encode("utf-8") if info.filename == "voice.properties" else zin.read(info)
            zout.writestr(info, data, compress_type=info.compress_type)
    return vid


if __name__ == "__main__":
    src_dir, out_dir = sys.argv[1], sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)
    for f in sorted(os.listdir(src_dir)):
        if f.endswith(".qbvoice"):
            print(relicense(os.path.join(src_dir, f), os.path.join(out_dir, f)), f)
