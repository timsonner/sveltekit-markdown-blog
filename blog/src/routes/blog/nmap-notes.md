---
title: 'nmap cheatsheet'
description: "Example syntax and command line argument definitions for the amazing nmap scanner."
author: 'Tim Sonner'
date: '2023-06-29'
published: true
---

# Nmap notes  

## Switches  

-O: Detect operating system  
-A: Aggressive  
-v: Verbose  
-vv: Double verbose  
-T\<int>: Timing  
-p \<int>: Port  
-p-: All ports  
-script=\<category or path to script>: Run script  
--script-help: Help on Script  
-Pn: Disable ping scan  
-iR \<int>: Random IP  
--script-updatedb: Update scripts.db  
--script-help "<string>": Script help  
  -f: Fragment packets  
--mtu \<int>: Maximum transmission unit size  
--data-length: Append random data to packet  
--scan-delay <time>ms: Delay between packets  
--badsum: Firewall check  
-n: No DNS resolve  
--dns-servers: Specify DNS servers  
-R: reverse-DNS lookup for all hosts (live/dead)  

## Scan types  

-sV: Identify services/versions scan.  
-sS: Syn "Half-open" aka "Stealth" scan   
-sU: UDP scan  
-sT: TCP Connect scan  
-sn: Disable port scan aka "Ping sweep"  
-sL: Test scan "List" targets  
-sN: TCP Null (All flags set to null)  
-sF: TCP FIN (FIN flag set to 1)  
-sX: TCP Xmas (URG, PUSH, FIN flags set to 1)  
-PS: TCP SYN Ping (SYN flag set tp 1)  
-PA: TCP ACK Ping (ACK flag set to 1)  
-PE: ICMP Echo (Type 8,0)  
-PP: ICMP Timestamp (Type 13,14)  
-PM: ICMP Address Mask (Type 17,18)  
-PR: ARP Ping *local subnet  
-PU: UDP Ping  

## Output  
-oA: All  
-oG: Grepable  
-oN: Normal  
-oX: XML  
-oS: Skript kitty  

## Examples  

    nmap -v -A scanme.nmap.org  
    nmap -v -sn 192.168.0.0/16 10.0.0.0/8  
    nmap -v -iR 10000 -Pn -p 80  
    nmap -sT --scan-delay 10s nmap.scanme.org  
    nmap -sL -n 10.11.12.13/29  
    nmap -PR -sn 10.11.12.13/29  
    nmap localhost -p 1024-65535  
    nmap -T4 10.10.0-255.1-12  
    nmap script=vuln  
    nmap -R --dns-servers 192.168.6.1  
    nmap -sV -vv --script=vuln $IP  

-PS80,443,8080  
    
Script Help:  
nmap --script-help "smb-* and discovery"  

Find script:  
ls -l /usr/share/nmap/scripts/*dns*  

Download script:  
sudo wget -O /usr/share/nmap/scripts/<script-name>.nse https://svn.nmap.org/nmap/scripts/<script-name>.nse  

<https://www.rfc-editor.org/rfc/rfc9293>  

