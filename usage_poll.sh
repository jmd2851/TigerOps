#!/bin/bash
total="$(df -h | awk '{print $2}' | head -n 2 | tail -n 1)"
total=${total:0:-1}
free="$(df -h | awk '{print $4}' | head -n 2 | tail -n 1)"
free=${free:0:-1}
mysql -u root --password=password -D tigeropsdata -e "UPDATE config SET Value = '$free' WHERE Name = 'FreeStorage'"
mysql -u root --password=password -D tigeropsdata -e "UPDATE config SET Value = '$total' WHERE Name = 'TotalStorage'"
echo "$free and $total"
