package android.content;
public class ClipData {
    public static class Item { final android.net.Uri uri; public Item(android.net.Uri u) { uri = u; } public android.net.Uri getUri() { return uri; } }
    final java.util.List<Item> items = new java.util.ArrayList<>();
    public ClipData(android.net.Uri... uris) { for (android.net.Uri u : uris) items.add(new Item(u)); }
    public int getItemCount() { return items.size(); }
    public Item getItemAt(int i) { return items.get(i); }
}
