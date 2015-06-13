# 1101 Departures Display
Displays MTD departure information for stop at 1101 E. University Avenue in Urbana, IL

Tested against Google Chrome (v43.0.2357.124) and designed to be run on Chromium Browser on a [Raspberry PI 2](https://www.raspberrypi.org/).

## Running Locally
1. Follow the steps at
https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll
to install Ruby, Bundler, and Jekyll.
2. To run the development server, from the application's root directory run: `bundle exec jekyll serve`

## Setting up a Raspberry Pi 2 to Run as a Kiosk
Much of the following comes from: https://github.com/MobilityLab/TransitScreen/wiki/Raspberry-pi
### Installing Raspbian
1. Install Raspbian from using an SD card with the NOOBS launcher.
2. When the Raspbian installer finishes it will run `raspi-config`.
  1. Select option `2 Change User Password` and set the password to whatever you would like.
  2. Select option `3 Enable Boot to Desktop/Scratch` and choose to boot to the command-line.
  3. Select your local and timezone in `4 Internationalization Options`.
  4. In `8 Advanced Options` set the hostname of the Raspberry Pi to whatever you would like.
3. Select `<Finish>`

### Configuring Raspbian
Once everything is installed and you are logged in, we need to configure the OS to run our software in kiosk mode.

1. Do a `sudo apt-get update` and `sudo apt-get upgrade` to update the OS.
2. Install Required Software
  1. Chromium Browser: `sudo apt-get install chromium-browser`
  2. X11 Utils: `sudo apt-get install x11-xserver-utils`
  3. Unclutter (Hides Mouse Pointer): `sudo apt-get install unclutter`
  3. *(optional)* VIM: `sudo apt-get install vim`
3. Add the following kiosk script to your home folder
  1. `vi kiosk.sh`
  2. Edit the script as follows:
  ```bash
  #!/bin/sh
  /usr/bin/xset -dpms
  /usr/bin/xset s off
  /usr/bin/unclutter & /usr/bin/chromium-browser -window-size=1280,1024 -kiosk http://cumtd.github.io/1101DeparturesDisplay/
  ```
  3. Allow the script to be executed. `chmod 755`

4. Setup autologin
  1. `sudo vi /etc/inittab`
  2. find the line `1:2345:respawn:/sbin/getty 115200 tty1` and prepend it with a `#` to comment it out.
  3. Under this line add the line `1:2345:respawn:/bin/login -f pi tty1 </dev/tty1 >/dev/tty1 2>&1`
5. Start the kiosk on login.
	1. Add a startup script: `sudo vi /etc/profile.d/start_kiosk.sh`
	2. Edit the script as follows:
	```bash
	#!/bin/sh
	/usr/bin/xinit /home/pi/kiosk.sh
	```
	3. Allow the script to be executed. `sudo chmod 755 /etc/profile.d/start_kiosk.sh`
6. Force Raspbian to use the correct resolution.
  1. Edit the Raspbin config file. `sudo vi /boot/config.txt`
  2. Find the lines that start with
  ```bash
  #framebuffer_width=XXXX
  #framebuffer_height=XXXX
  ```
  and replace them with
  ```bash
  framebuffer_width=1280
  framebuffer_height=1024
  ```
7. Reboot and make sure everythin works as expected `sudo shutdown -r now`