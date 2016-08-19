# 1101 Departures Display
Displays MTD departure information for stop at 1101 E. University Avenue in Urbana, IL

Tested against Google Chrome (v43.0.2357.124) and designed to be run on Chromium Browser on a [Raspberry PI 2](https://www.raspberrypi.org/).

## Running Locally
1. Follow the steps at

### Requirements
* Node/NPM
* Ruby

### Setup NPM, Typings and Webpack
Once node and npm are configured run the following node commands from the project root.

```bash
npm install -g typescript typings webpack
npm install
npm link typescript
typings install
```

To build the scripts run either `webpack` or `webpack -w`. The latter will watch main.tsx for changes.

### Setup Github Pages
https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll
to install Ruby, Bundler, and Jekyll.
2. To run the development server, from the application's root directory run: `bundle exec jekyll serve`

## Setting up a Raspberry Pi to Run as a Kiosk
Much of the following comes from: https://github.com/MobilityLab/TransitScreen/wiki/Raspberry-pi
### Installing Raspbian
Install Raspbian from using an SD card with the NOOBS launcher.

### Configuring Raspbian
Once everything is installed and you are logged in, we need to configure the OS to run our software in kiosk mode.

1. Install chromium source:
  ```bash
  wget -qO - http://bintray.com/user/downloadSubjectPublicKey?username=bintray | sudo apt-key add -
  echo "deb http://dl.bintray.com/kusti8/chromium-rpi jessie main" | sudo tee -a /etc/apt/sources.list
  sudo apt-get update
  ```
2. Do a `sudo apt-get upgrade` to update to all the latest software.
3. Install Required Software
  1. Chromium Browser: `sudo apt-get install chromium-browser`.
  2. X11: `sudo apt-get install x11-xserver-utils xorg`
  3. Unclutter (Hides Mouse Pointer): `sudo apt-get install unclutter`
  4. *(optional)* VIM: `sudo apt-get install vim`
4. Add the following kiosk script to your home folder
  1. `vi kiosk.sh`
  2. Edit the script as follows:
  ```bash
  #!/bin/sh
  /usr/bin/xset -dpms
  /usr/bin/xset s off
  /usr/bin/unclutter & /usr/bin/chromium-browser -window-size=1280,1024 -kiosk -incognito http://cumtd.github.io/1101DeparturesDisplay/
  ```
  3. Allow the script to be executed. `chmod 755`

4. Setup autologin
  1. `sudo vi /etc/systemd/system/getty@tty1.service.d/autologin.conf` and add the following:
  ```bash
  [Service]
  ExecStart=
  ExecStart=-/sbin/agetty --autologin pi --noclear %I 38400 linux
  ```
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
