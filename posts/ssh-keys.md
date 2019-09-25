---
title: "Linux: Configuring SSH Keys"
date: "2013-01-12"
---

I’ve experienced a few situations where its been necessary to configure an SSH key in order to access a Linux box remotely and securely.

This post will be an overview of the general configuration of such a setup, in case I ever have to do something similar in future. These instructions are readily available all over the internet in various formats, but I like to have it all written up in one place.

![A set of keys](/posts/ssh-keys/keys.jpg)

### Step 1 – Generate a public and private SSH key

On the server that will connect to the remote machine, run the command:

```shellscript
ssh-keygen -t dsa
```

The following prompts will occur:

```
Enter file in which to save the key:
Enter passphrase (empty for no passphrase):
```

Say we name the key `mykey`, after answering the prompts two new files will be generated:

```
Your identification has been saved in mykey.
Your public key has been saved in mykey.pub.
```

### Step 2 – Add the public key to the remote user’s authorized_keys

In order to be able to log in to a remote machine as a specific user on that box, this user’s `~/.ssh/authorized_keys` file must contain an entry with the public key generated in step 1. In this entry, the key can be locked down to only run a specific command, which in this case is a script that decides whether or not to execute the desired command that’s passed as an argument.

Below is an example `authorized_keys` entry:

```
command=”/etc/init.d/restrict-ssh.pl”,no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty [full contents of mykey.pub]
```

The first part of `mykey.pub` is the text `ssh-dss`, which should be included in the above. The last part is a comment, which can be modified if desired.

### Step 3 – Create a script that restricts the runnable commands

This step is optional depending on whether the user is to be allowed unrestricted access, in which case drop the `command=` from `authorized_keys`. Otherwise, the command specified is run, i.e. the script. When invoking the SSH key, the actual desired command is passed as an argument via an environment variable which this script parses and decides whether to invoke or not.

A sample script could, for example, only permit SCP commands against a certain directory. If the command is allowed then execute it, else return an error message.

I generally opt for Perl as its regular expression engine is more powerful than Bash’s. I use a script that simply allows commands that `ls` the contents of `/home/chrise`, or `scp` (secure copy) any file from that directory. Any other command returns an error string.

### Results

That’s all there is to the configuration. Below are a couple of commands that illustrate how to use the SSH key, along with their results based on the script mentioned above:

```shellscript
# Copy the file 'mountdriveimpl.sh' from the remote machine to 'newfile' in this directory.
scp -i mykey chrise@raspbmc:/home/chrise/mountdriveimpl.sh newfile

mountdriveimpl.sh 100% 9466 9.2KB/s 00:00

# Attempt to make a new top-level directory 'apps'.
ssh -i mykey chrise@raspbmc "mkdir /apps"

Unauthorised command ‘mkdir /apps’
```

Thanks for reading!