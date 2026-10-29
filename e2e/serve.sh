#!/bin/sh
# (re)start the two local test servers: 8765 = working copy, 8766 = v0.9.4 baseline
S=/tmp/claude-0/-home-claude/dea1de63-8e34-5c08-a548-75373b438825/scratchpad
curl -s -o /dev/null http://127.0.0.1:8765/index.html || (cd /home/claude/apk53/assets/www && setsid nohup python3 -m http.server 8765 --bind 127.0.0.1 >/dev/null 2>&1 &)
curl -s -o /dev/null http://127.0.0.1:8766/index.html || (cd $S/www-094 && setsid nohup python3 -m http.server 8766 --bind 127.0.0.1 >/dev/null 2>&1 &)
sleep 1
