---
title: "The Pi and I"
date: "2012-09-30"
---

A few weeks ago I was convinced to buy a [Raspberry Pi](https://www.raspberrypi.org/).
 
It’s a very flexible piece of kit, and has a friendly community supporting it to boot. It also gives me a chance to delve into a Linux environment at home, something I haven’t done before.
My RPi is currently employed as a media center and sits comfortably next to the television in my living room.

![A picture of a Raspberry Pi](/posts/the-pi-and-i/thepi.jpg)

In this post I’m going to go over the equipment required to set it up and steps taken to configure it. In the end it was a surprisingly cheap and fairly straightforward solution.

### Kit

 - Raspberry Pi
 - Micro-USB Adapter (most phone chargers work perfectly)
 - CAT5 Ethernet Cable
 - HDMI-to-HDMI Cable
 - SD Card (2GB or more)

### Installation and Configuration

The OS sits on the SD card, so the starting point is downloading an OS image to put on it. The ‘official’ distribution is a stripped-down Debian, however there are a few customised OS’s out there. I decided to go with [Raspbmc](https://www.raspbmc.com/), a customisation that comes with [XBMC](https://xbmc.org/) pre-installed and configured from the get-go. Perfect for a media center.

I grabbed the installer from the official website and downloaded the package. The installer also offers to write the image to the SD Card, however this didn’t work with my Kingston 8GB Class 4 SD Card. I ended up going with [Fedora ARM Installer](https://fedoraproject.org/wiki/Fedora_ARM_Installer) which, while not perfect, got the job done.

Booting the Pi for the first time causes it to download the latest Raspbmc package, which it then configures automatically over about 20 minutes. After completion, and from then on after boot, the main XBMC menu appears.

![A picture of the XBMC main menu](/posts/the-pi-and-i/xbmcmenu.jpg)

Something I only realised after installation was that XBMC auto-detects CEC-enabled TV’s (I also learned what CEC was), which meant that my TV remote worked with it ‘out-of-the-box’ so to speak – an added bonus. However, I also decided to download the [XBMC Android App](https://play.google.com/store/apps/details?id=org.xbmc.android.remote&feature=nav_result#?t=W251bGwsMSwxLDMsIm9yZy54Ym1jLmFuZHJvaWQucmVtb3RlIl0), which is a lot easier and more responsive, and allows me to use my tablet as a remote controller. It works really well and is pretty cool.

The first thing I did was use the XBMC settings menu to configure a static IP address for the Pi so that I’m able to connect to the same IP every time. As the Pi is connected to my network via ethernet cable I can just SSH in via PuTTY from my PC, which accesses the Linux terminal directly. I also use FileZilla to FTP files across.

There are two further things I wanted to do with this machine.

### Automatically Mount USB Drives

First of all, I’m going to be using an external drive to store files on. XBMC detects when a drive has been plugged in and automatically mounts it, however (in my version at least) this doesn’t occur if it’s already plugged in on startup, so I had to write a couple of small shell scripts to do the job for me.

The first script is invoked when the machine starts up, and all it does is call an implementation script that does the actual work.

```
#! /bin/sh
# /etc/init.d/mountdrive
### BEGIN INIT INFO
# Provides: mountdrive
# Required-Start:
# Required-Stop:
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Mount USB1.
# Description:       Mount USB1 at boot time.
### END INIT INFO

sudo nohup /etc/init.d/mountdriveimpl &
exit 0
```

The header contains information about the file and the runlevels. All it does is invoke the next script located at `/etc/init.d/mountdriveimpl` in admin mode (`sudo`) and uses `nohup` to ensure that it doesn’t block until the other script has returned.

Two further things need to be done to this script to get it to run at boot-time – first of all running the command

```shellscript
sudo chmod +x /etc/init.d/mountdrive
```

In order to make the file executable, and

```shellscript
sudo update-rc.d /etc/init.d/mountdrive defaults
```

Which is a Debian-specific command to add it to the boot sequence.

The mountdriveimpl file is as follows:

```shellscript
#! /bin/sh
# /etc/init.d/mountdriveimpl
### BEGIN INIT INFO
# Provides: mountdriveimpl
# Required-Start:
# Required-Stop:
# Default-Start:
# Default-Stop:
# Short-Description: Mount USB1.
# Description:       Mount USB1 at boot time.
### END INIT INFO

sleep 120
sudo mount -o uid=pi,gid=pi /dev/sda1 /media/usb
exit 0
```

And now it should become clear why I was using `nohup` earlier. This script sleeps for two minutes before continuing – sometimes the system encountered issues trying to mount the USB storage immediately at boot (one time bricking the entire SD and requiring a complete reflashing…), so I figured this is the safest way to ensure everything runs smoothly.

By default unmounted USB devices are located under `/dev/sda#`, where `#` is the number of the drive. This script mounts the contents of drive 1 to the folder `/media/usb`.
Like the last one, this script requires `chmod`-ing.

### Access RPi through Microsoft Windows Network

The second thing I wanted to do was access the USB storage connected in a more user-friendly way than SFTP via FileZilla (which is rather slow for some reason), so I installed [Samba](https://www.samba.org/), which implements the SMB/CIFS protocol used by Microsoft Windows Network – in other words it can be configured to display the USB drive in the Network Locations on a Windows machine, and allow dragging and dropping of files to and from it.

The release of Raspbmc that I installed didn’t come with Samba by default, so I had to download it. The handy `apt-get` command allows download and installation of packages, however before that I had to run the following command to update the index with the latest changes to these applications:

```shellscript
sudo apt-get update
```

After this I was able to download Samba via the command

```shellscript
sudo apt-get install samba
```

which takes a while to download.

After downloading Samba I had to make two changes in the configuration file `/etc/samba/smb.conf`; first, uncommenting the line

```shellscript
interfaces = 127.0.0.0/8 eth0
```

which essentially allows it to enable the folders at boot. Secondly, adding the details of the `/media/usb` folder as a network location. This is done with the following setting.

```shellscript
[Xillia]
comment = USB Key Drive
path = /media/usb
writeable = yes
browseable = yes
valid users = pi nobody
guest ok = yes
guest account = nobody
guest only = no
force user = pi
read list = pi nobody
write list = pi nobody
create mask = 0775
directory mask = 0775
```

This allows full access rights to the drive over the network.

So with this, the USB drive is automatically mounted and then made available over the network. A pretty cool combination of technology I thought.
As an additional note, my PC had no problems automatically mounting a secure Truecrypt volume that was stored on the USB drive, which means my PC could also backup securely to this location.

### Final Notes

This setup has worked very smoothly for me so far and I’m pretty happy with it. One thing I should mention is that in general this version of XBMC doesn’t render AVI files, producing only the sound output. I haven’t delved into it too much but I believe this is due to codec restrictions on the Pi. MKVs played perfectly though, and to be honest most video files are distributed as MKVs nowadays. I’ll just have to convert my old AVIs to MKVs at some point.
I did run into an issue with 1080p MKVs, which was that the screen would occasionally go black for a second before continuing; lowering the default framerate in XBMC’s settings solved the problem.
The other point to note is that it’s technically unhealthy to turn off the Pi without a clean OS shutdown, which I perform manually with the following script:

```shellscript
#! /bin/sh
### BEGIN INIT INFO
# Provides: shutdownpi
# Required-Start:
# Required-Stop:
# Default-Start:
# Default-Stop:
# Short-Description: Shut down cleanly.
# Description:       Shut down cleanly.
### END INIT INFO
 
sudo /etc/init.d/samba stop
sudo initctl stop xbmc
sudo poweroff
```

This shuts down Samba, XBMC, and finally the OS itself (though not the machine). I’ve had no problems just flicking off the switch other than a few inconsequential error messages logged at the next boot, but there may be a chance the SD card becomes corrupt. I intend to just take an image of my current setup so that if this happens I can write it back to the SD card and return it to a stable state with no fuss.

In the end the Raspberry Pi has provided me with a great media center solution for under £50 with a lot of flexibility/added features such as backing up to a different machine, and has also been an interesting lesson in the Unix environment.

I hope this post has been of some interest, and for those looking for (or piqued by the idea of) a media center possibly even provided some ideas. Thanks for reading!

Update: These scripts are now available on [Github](https://github.com/Ceva24/pi-scripts).