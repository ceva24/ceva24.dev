---
title: "Java: Sending Email with SMTP via SSL"
date: "2013-05-28"
---

This is an example that shows how to send emails using pure Java.

### Tools

the [JavaMail API](https://javaee.github.io/javamail/) is the standard library for handling email. As of this post the latest version is 1.5.0. For this example the following JARs are required:

-   mailapi-1.5.0.jar
-   smtp-1.5.0.jar

### Email Sender

This is a simple template that provides methods for sending an email with an attachment:

```java
package org.chrise;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

public class EmailSender
{
    private final String fromAddress;
    private final Session session;

    public EmailSender(String fromAddress, Properties props, final String user,
            final String pass)
    {
        this.fromAddress = fromAddress;

        // Create a new session with the user and pass.
        session = Session.getInstance(props, new Authenticator()
        {
            @Override
            protected PasswordAuthentication getPasswordAuthentication()
            {
                return new PasswordAuthentication(user, pass);
            }
        });
    }

    public void sendEmailWithAttachment(String toAddress, String subject, String body,
            String attachmentName, String attachmentFilePath, String attachmentMediaType)
            throws AddressException, MessagingException, IOException
    {
        // Construct the email as a mime multipart - body text and attachment.
        final Message message = new MimeMessage(session);
        final Multipart content = new MimeMultipart();

        // Set the email properties.
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(toAddress));
        message.setFrom(new InternetAddress(fromAddress));
        message.setSubject(subject);

        // Create the body text part.
        final BodyPart bodyPart = new MimeBodyPart();
        bodyPart.setText(body);
        content.addBodyPart(bodyPart);

        // Create the attachment part.
        final BodyPart attachment = new MimeBodyPart();
        final DataSource source = new ByteArrayDataSource(
                Files.readAllBytes(Paths.get(attachmentFilePath)),
                attachmentMediaType);

        attachment.setDataHandler(new DataHandler(source));
        attachment.setFileName(attachmentName);
        content.addBodyPart(attachment);

        message.setContent(content);

        // Send the email.
        Transport.send(message);
    }
}
```

In the constructor a session is established with the SMTP host, passing in a set of properties (more on these later) and the user/pass. In the `sendEmail` method, an instance of `MimeMessage` is created and various properties set on it (to address, from address, content etc.). At the end this is sent via `Transport.send(message)`.

For attachments three things are required: a name, a file and a media type. `MimeMultipart` is the object that stores the body text and any attachments, and this is passed into the `MimeMessage` at the end and sent.

Below is a small driver that shows how to configure the SMTP properties and send emails:

```java
package org.chrise;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import javax.mail.MessagingException;
import org.chrise.EmailSender.Attachment;

public class EmailDriver
{
    public static void main(String[] args)
    {
        final Properties props = new Properties();
        props.put("mail.smtp.host", "redacted");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");

        final EmailSender sender = new EmailSender("christian@ceva24.co.uk", props,
                "redacted", "redacted");

        try
        {
            sender.sendEmailWithAttachment("christian@ceva24.co.uk",
                    "Java Email with Attachment Test", "Hello World 2!",
                    "myzip.zip", "C:\\azip.zip", "application/zip");
        }
        catch (MessagingException e)
        {
            System.err.println("Failed to send email: " + e.getMessage());
        }
        catch (IOException e)
        {
            System.err.println("Failed to create attachment: " + e.getMessage());
        }
    }
}
```

As you can see the properties object contains all the necessary information about the SMTP host. Obviously depending on your email address these settings may be different, for example gmail users would change the `mail.smtp.host` property to `smtp.gmail.com`.

One other thing to note is that the attachments can be given a name different to the one on the local file system, as above a local file `azip.zip` is attached as `myzip.zip`.

And when this method is run:

![Email inbox with the example message open](/posts/sending-email/email.png)

Message received!

Thanks for reading
