"if has("syntax")
"      syntax on            " 语法高亮
"endif
syntax enable	"语法高亮
syntax on
colorscheme desert     " elflord ron peachpuff default 设置配色方案，vim自带的配色方案保存在/usr/share/vim/vim74/colors目录下
"filetype on
filetype plugin on
if has("autocmd")
	      au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" |
endif
set ignorecase
set smartcase
"set autoindent
set autowrite
"set smartindent
set tabstop=4
set softtabstop=4
set shiftwidth=4
"set cindent
set cinoptions={0,1s,t0,n-2,p2s,(03s,=.5s,>1s,=1s,:1s
set backspace=2
set showmatch
set linebreak
set whichwrap=b,s,<,>,[,]
set hidden
set mouse=a
set number
set previewwindow
set history=50
set laststatus=2
set ruler
set showcmd
set showmode
set incsearch
set hlsearch
set shellcmdflag=-ic
"-----------ctags seeting----------------
"nmap <F5> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .<CR><CR> :TlistUpdate<CR>
"nmap <F5> <ESC>:!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .<CR><CR> :TlistUpdate<CR>
"set tags=tags
set tags+=./tags 
set tags+=~/Workstation/Test/tags

"----------Taglist setting----------------
nmap <F5> :Tlist <CR>
let Tlist_Show_One_File = 1
let Tlist_Exit_OnlyWindow = 1
let Tlist_User_Right_Window = 1

"----------vundle vim plugin manager setting---
set nocompatible               " be iMproved
filetype off                   " required!

call vundle#rc()

" My Bundles here:
"
"Bundle 'gmarik/vundle' " original repos on github
"Bundle 'tpope/vim-fugitive'
"Bundle 'Lokaltog/vim-easymotion'
"Bundle 'rstacruz/sparkup', {'rtp': 'vim/'}
"Bundle 'tpope/vim-rails.git'
	" vim-scripts repos
"	Bundle 'L9'
"	Bundle 'FuzzyFinder'
"	" non github repos
"	Bundle 'git://git.wincent.com/command-t.git'
	" ...

	filetype plugin indent on     " required! 
	"
	" Brief help
	" :BundleList          - list configured bundles
	" :BundleInstall(!)    - install(update) bundles
	" :BundleSearch(!) foo - search(or refresh cache first) for foo
	" :BundleClean(!)      - confirm(or auto-approve) removal of unused bundles
	"
	" see :h vundle for more details or wiki for FAQ
	" NOTE: comments after Bundle command are not allowed..

"---------NERDTree setting--
map <F4> :NERDTree <CR>
"---------WinManager setting-----------
let g:winManagerWindowLayout='FileExplorer|TagList'
map <F6> :WMToggle <cr>
"---------Cscope setting--------------
set cscopequickfix=s-,c-,d-,i-,t-,e-		"设置是否将结果用quickfix显示
nmap <C-_>s :cs find s <C-R>=expand("<cword>")<CR><CR>
nmap <C-_>g :cs find g <C-R>=expand("<cword>")<CR><CR>
nmap <C-_>c :cs find c <C-R>=expand("<cword>")<CR><CR>
nmap <C-_>t :cs find t <C-R>=expand("<cword>")<CR><CR>
nmap <C-_>e :cs find e <C-R>=expand("<cword>")<CR><CR>
nmap <C-_>f :cs find f <C-R>=expand("<cfile>")<CR><CR>
nmap <C-_>i :cs find i ^<C-R>=expand("<cfile>")<CR>$<CR>
nmap <C-_>d :cs find d <C-R>=expand("<cword>")<CR><CR>
"---------quickfix setting-----------
nmap <F7> :cn<cr>
nmap <F8> :cp<cr>
"---------minibuffer explorer setting-----
let g:miniBufExplMapCTabSwitchBufs=1
let g:miniBufExplMapWindowNavVim=1
let g:miniBufExplMapWindowNavArrows=1
nnoremap <silent> <F12> :A<CR>
"---------grep setting----------------
nnoremap <silent><F3> :Grep <CR>
"---------Super tab-------------------
"let g:SuperTabRetainCompletionType=2
"let g:SuperTabDefaultCompletionType="<C_X><C_O>"
"---------complier----------------

func! CompileGcc()
    exec "w"
    let compilecmd="!gcc "
    let compileflag="-o %< "
    if search("mpi\.h") != 0
        let compilecmd = "!mpicc "
    endif
    if search("glut\.h") != 0
        let compileflag .= " -lglut -lGLU -lGL "
    endif
    if search("cv\.h") != 0
        let compileflag .= " -lcv -lhighgui -lcvaux "
    endif
    if search("omp\.h") != 0
        let compileflag .= " -fopenmp "
    endif
    if search("math\.h") != 0
        let compileflag .= " -lm "
    endif
    exec compilecmd." % ".compileflag
endfunc
func! CompileGpp()
    exec "w"
    let compilecmd="!g++ "
    let compileflag="-o %< "
    if search("mpi\.h") != 0
        let compilecmd = "!mpic++ "
    endif
    if search("glut\.h") != 0
        let compileflag .= " -lglut -lGLU -lGL "
    endif
    if search("cv\.h") != 0
        let compileflag .= " -lcv -lhighgui -lcvaux "
    endif
    if search("omp\.h") != 0
        let compileflag .= " -fopenmp "
    endif
    if search("math\.h") != 0
        let compileflag .= " -lm "
    endif
    exec compilecmd." % ".compileflag
endfunc

func! RunPython()
        exec "!python %"
endfunc
func! CompileJava()
    exec "!javac %"
endfunc


func! CompileCode()
        exec "w"
        if &filetype == "cpp"
                exec "call CompileGpp()"
        elseif &filetype == "c"
                exec "call CompileGcc()"
        elseif &filetype == "python"
                exec "call RunPython()"
        elseif &filetype == "java"
                exec "call CompileJava()"
        endif
endfunc

func! RunResult()
        exec "w"
        if search("mpi\.h") != 0
            exec "!mpirun -np 4 ./%<"
        elseif &filetype == "cpp"
            exec "! ./%<"
        elseif &filetype == "c"
            exec "! ./%<"
        elseif &filetype == "python"
            exec "call RunPython"
        elseif &filetype == "java"
            exec "!java %<"
        endif
endfunc

map <F7> :call CompileCode()<CR>
imap <F7> <ESC>:call CompileCode()<CR>
vmap <F7> <ESC>:call CompileCode()<CR>

map <F8> :call RunResult()<CR>
