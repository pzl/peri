Peri Driver
===========

This is a libusb-based driver for a **Perixx Periboard-717** wireless USB keyboard and mouse.

The device works quite well as a set of HIDs out of the box, even on Linux. But a few keys were non-functional (discarded at the kernel level) and lacked multitouch, and lacked key remapping.

Key assignments could have been changed fairly easily through xmodmap or whatever you use for keybindings in your desktop environment. Nothing stopping you from doing that. Was just easy enough to also enable through this. 

Adds support for the following 3 keys:

- Channel Up
- Channel Down, and 
- the keyboard-key right next to the spacebar.

The channel buttons are sent to linux properly, but as keycodes 410 and 411. The linux kernel up to this point does not support keycodes above 255, so the kernel was discarding these keys. The kernel didn't seem to be registering any key input for the keyboard button, but it was being sent over USB, so we can pick that up.

The device claims to be multi-touch with the appropriate driver under Windows 7. I was not able to determine any input from this device sniffing USB traffic to indicate that or write support under linux _yet_. 

Requires
--------

- Libusb 1.0+
- xdotool (to simulate keyboard and mouse movements in user space)


debian dependency install:
sudo apt-get install build-essential pkg-config libusb-1.0-0-dev
