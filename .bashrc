#
# ~/.bashrc
#
command cowsay $(fortune)
# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
#PS1='[\u@\h \W]\$ '
PS1='\[\e[0;31m\]\u\[\e[m\] \[\e[1;34m\]\w\[\e[m\] \[\e[0;31m\]\$ \[\e[m\]\[\e[0;32m\] '
shopt -s extglob	#确保exttglob被打开：
#modified commands
alias diff='colordiff'              # requires colordiff package
alias grep='grep --color=auto'
alias more='less'
alias df='df -h'
alias du='du -c -h'
alias mkdir='mkdir -p -v'
alias nano='nano -w'
alias ping='ping -c 5'
alias ..='cd ..'
# new commands
alias da='date "+%A, %B %d, %Y [%T]"'
alias du1='du --max-depth=1'
alias hist='history | grep $1'      # requires an argument
alias openports='ss --all --numeric --processes --ipv4 --ipv6'
alias pg='ps -Af | grep $1'         # requires an argument (note: /usr/bin/pg is installed by the util-linux package; maybe a different alias name should be used)
alias gcc='gcc -std=c99'
# privileged access
if [ $UID -ne 0 ]; then
   alias sudo='sudo '
   alias scat='sudo cat'
   alias svim='sudo vim'
   alias root='sudo su'
   alias reboot='sudo systemctl reboot'
   alias poweroff='sudo systemctl poweroff'
   alias update='sudo pacman -Su'
   alias netcfg='sudo netcfg2'
fi
# ls
alias ls='ls -hF --color=auto'
alias lr='ls -R'                    # recursive ls
alias ll='ls -l'
alias la='ll -A'
alias lx='ll -BX'                   # sort by extension
alias lz='ll -rS'                   # sort by size
alias lt='ll -rt'                   # sort by date
alias lm='la | more'
# safety features
alias cp='cp -i'
alias mv='mv -i'
alias rm='rm -I'                    # 'rm -i' prompts for every file
alias ln='ln -i'
alias chown='chown --preserve-root'
alias chmod='chmod --preserve-root'
alias chgrp='chgrp --preserve-root'
# pacman aliases (if applicable, replace 'pacman' with 'yaourt'/'pacaur'/whatever)
alias pac="pacman -S"      # default action     - install one or more packages
alias pacu="pacman -Syu"   # '[u]pdate'         - upgrade all packages to their newest version
alias pacs="pacman -Ss"    # '[s]earch'         - search for a package using one or more keywords
alias paci="pacman -Si"    # '[i]nfo'           - show information about a package
alias pacr="pacman -R"     # '[r]emove'         - uninstall one or more packages
alias pacl="pacman -Sl"    # '[l]ist'           - list all packages of a repository
alias pacll="pacman -Qqm"  # '[l]ist [l]ocal'   - list all packages which were locally installed (e.g. AUR packages)
alias paclo="pacman -Qdt"  # '[l]ist [o]rphans' - list all packages which are orphaned
alias paco="pacman -Qo"    # '[o]wner'          - determine which package owns a given file
alias pacf="pacman -Ql"    # '[f]iles'          - list all files installed by a given package
alias pacc="pacman -Sc"    # '[c]lean cache'    - delete all not currently installed package files
alias pacm="makepkg -fci"  # '[m]ake'           - make package from PKGBUILD file in current directory
#下面是自定义的函数:
extract() {
	 local c e i

     (($#)) || return
     for i; do
		 c=''
         e=1
		 if [[ ! -r $i ]]; then
	         echo "$0: file is unreadable: \`$i'" >&2
		     continue
	     fi
	     case $i in
	          *.t@(gz|lz|xz|b@(2|z?(2))|a@(z|r?(.@(Z|bz?(2)|gz|lzma|xz)))))
		      c='bsdtar xvf';;
	          *.7z)  c='7z x';;
		      *.Z)   c='uncompress';;
		      *.bz2) c='bunzip2';;
		      *.exe) c='cabextract';;
		      *.gz)  c='gunzip';;
		      *.rar) c='unrar x';;
		      *.xz)  c='unxz';;
		      *.zip) c='unzip';;
		      *)     echo "$0: unrecognized file extension: \`$i'" >&2
																													                                    continue;;
																																	         esac
																																			 command $c "$i"
																																		     e=$?З
																																		 done
																																	     return $e
  }
#setting for less
man() {
		env \
					LESS_TERMCAP_mb=$(printf "\e[1;37m") \
					LESS_TERMCAP_md=$(printf "\e[1;37m") \
					LESS_TERMCAP_me=$(printf "\e[0m") \
					LESS_TERMCAP_se=$(printf "\e[0m") \
					LESS_TERMCAP_so=$(printf "\e[1;47;30m") \
					LESS_TERMCAP_ue=$(printf "\e[0m") \
					LESS_TERMCAP_us=$(printf "\e[0;36m") \
				              man "$@"
	}
