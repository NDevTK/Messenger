const token = "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVkYzc5ZDUwMjQ5YTg4MmVhMGU4ZWI3MzljYzA3ZWZiMTZjYTI1MzY4MTFmYmFkNjdhMWE1ODExNzVmNDdhNWJiNDUxYWU5NDc4YTlkMThiIn0.eyJhdWQiOiI2IiwianRpIjoiZWRjNzlkNTAyNDlhODgyZWEwZThlYjczOWNjMDdlZmIxNmNhMjUzNjgxMWZiYWQ2N2ExYTU4MTE3NWY0N2E1YmI0NTFhZTk0NzhhOWQxOGIiLCJpYXQiOjE1NzQ5NDMzMzEsIm5iZiI6MTU3NDk0MzMzMSwiZXhwIjoxNjA2NTY1NzMxLCJzdWIiOiI4NyIsInNjb3BlcyI6W119.tFDMKTYGi9VdP26J7vLkbYoDnCpn72WVE9DWO9p-iYb4n1-euboEJEM8HC4I7zkVeFFTRWWH4q4pTeyNtG_UPuvm4yNJrOxP0NTmINNBAqsSiyvlVADv1ZBBdIRgaIZQ8oXcqyYXTXP9yCEaVCARcra40JMMXK1OUGN8ZwbCZL6jIHvtW6ozPQM1IsaDb6fwc9sgpXVq4taVuA6dnMJVc_vVxplzNrMbT5LbLaPXk7R3E5PJQi1mVR1TWMXtcBe3pnYOsmqXKjHm7W1zKtCkuu-JKiO3xhmM0JhrxD1VYeef2fcuAGKYZ_c31Ize8f-aG6wpY_h1UeO6FAGqy_RCTkJ-4Nf5f_bs7WEmYsSyFg00UQ2QEwmBDAqXpmNpqx2SjJuy065KannKSTXppk0UiAUMO81JcPkLDK9Pss51KfrhqU7vnN0N4Hf-magNGoOOpveEha689SMw3C_QPmQ34zpyCPy5BGQVKIdKz7snfVrwqMNDlNUHe0dO3x0LvN0ZzfUbIki40fh9Hh9FT9GM8fylzGBPY6IKjNTE517nYuuWwzJ73poFHa2R_Mc-3GcMGcHf_WzAYnPtVkT1APsD9Ymn9MEC_5Jl5MiGTryuC63-Ri8BqQgOMZ5Sc3YCLHBfSK6vqU1Dl8ajVleLC9MVuLflfhKaoCENZRCLs3iGEso";
const base = "wss://connect.websocket.in/v2/";

function Header(version = "1.0.0.0", year = 2019) {
    output.innerText =
    `Noob Messenger [Version ${version}]
    User must be online. /room [1-10000]
    (c) ${year} NDev.`
    }

    createShocket();

    function createShocket(id = 1) {
        let address = base;
        address += id+token;
        socket = new WebSocket(address);
    }
    
    
    async function HELPLookup(command) {
        end = (command) ? "RAW/" + command.toUpperCase() : "Summary";
        resp = await fetch("https://cmddoc.ndev.tk/" + end);
        if (!resp.ok) return 'This command is not supported by the help utility.  Try "' + command + ' /?".'
        text = await resp.text();   
        return text;
    }
    
    var help = new Map();
    var commands = new Map();
    var colors = new Map();
    var hcount = 0;
    var hdata = [];
    
    help.set("room", "room [1-10000]");

    function IsTouch() {
        var match = window.matchMedia || window.msMatchMedia;
        if (match) {
            var mq = match("(pointer:coarse)");
            return mq.matches;
        }
        return false;
    }
    
    async function room(id) {
        if(isNaN(id) ||  id > 10000 || id === 0) {
            EchoLine("room id is not valid it must be a number 1-10000");
            return
        }
        socket.close();
        createShocket(id);
        EchoLine("Switched to room id: ".concat(id));
    }

    function history(down) {
        if (hdata.length < 1) return;
        if (down) {
            if (hcount > 1) {
                hcount -= 1;
                input.innerText = hdata[hdata.length - hcount];
            }
        } else {
            if (hdata.length > hcount) {
                hcount += 1;
                input.innerText = hdata[hdata.length - hcount];
            }
        }
    
    }
    colors.set('0', 'Black')
        .set('1', 'Blue')
        .set('2', 'Green')
        .set('3', 'Aqua')
        .set('4', 'Red')
        .set('5', 'Purple')
        .set('6', 'Yellow')
        .set('7', 'White')
        .set('8', 'Gray')
        .set('9', 'LightBlue')
        .set('a', 'Green')
        .set('b', 'Aqua')
        .set('c', 'LightRed')
        .set('d', 'LightPurple')
        .set('e', 'LightYellow')
        .set('f', 'White')
    
    function LowerCase(array) {
        for (var i = 0; i < array.length; i++) {
            array[i] = array[i].toLowerCase()
        }
        return array
    }
    
    function ColorParser(codes) {
        codes = LowerCase(codes);
        if (colors.has(codes[1])) {
            document.body.style.color = colors.get(codes[1]);
        }
        if (colors.has(colors[2])) {
            document.body.style.backgroundColor = colors.get(colors[2]);
        }
    }
    
    function getDisplayable(args, silce) {
        return args.slice(silce).join(" ");
    }
    
    async function Help(command) {
        let reply = "";
        if(!command) {
            help.forEach(cmd => reply += cmd+"\n");
        }
        if(help.has(command)) {
            reply += help.get(command);
        } else {
            reply += await HELPLookup(command);
        }
        EchoLine(reply);
        return;
    }
    
    command = document.getElementById("command")
    output = document.getElementById("output");
    Header();
    input = document.getElementById("input");
    if (IsTouch) {
        input.isContentEditable = true;
    }
    
    socket.addEventListener('message', function(event) {
        NewLine();
        EchoLine(event.data);
    });
    
    function OSK() {
        if (IsTouch) {
            input.focus();
        }
    }
    
    function echo(line) {
        return output.innerText += line;
    }
    
    function SeparateLine(line) {
        echo("\n" + line + "\n");
    }
    
    function EchoLine(line) {
        echo("\n" + line);
    }
    
    function NewLine() {
        echo("\n");
    }
    document.addEventListener('keydown', function(e) {
        if (e.key.length === 1) {
            input.innerText += e.key;
            return
        }
        txt = command.innerText.trim();
        switch (e.code) {
            case "Enter":
                EchoLine(command.innerText);
                process(txt);
                hdata.push(input.innerText);
                input.innerText = "";
                break;
            case "Backspace":
                input.innerText = input.innerText.slice(0, -1);
                break;
            case "Space":
                input.innerText += " ";
                break;
            case "ArrowDown":
                history(true);
                break;
            case "ArrowUp":
                history(false);
                break;
        }
    });
    
    function SendMessage(displayable) {
        socket.send(displayable);
    }
    
    function process(command) {
        tmp = command.split(/>(.*)/);
        path = tmp[0]; // \>
        args = input.innerText.split(" "); // echo,hello,world 
        displayable = getDisplayable(args, 1);
        switch (args[0].toLowerCase()) {
            case "/cls":
                output.innerText = "";
                break;
            case "/echo":
                if (args.length > 1) {
                    EchoLine(displayable);
                } else {
                    EchoLine("ECHO is on.")
                }
                break;
            case "/color":
                ColorParser(args);
                break;
    
            case "/help":
                Help(args[1])
                break;
                
            case "/room":
                if(args.length === 2) {
                    room(args[1]);
                    break;
                }
                Help("room");
                break;
    
            case "/title":
                if (args.length > 1) {
                    document.title = displayable
                }
                break;
            default:
                if(command.startsWith("/")) {
                    if (!commands.has(args[0])) {
                    EchoLine("'" + args[0] + "' is not recognized as an internal or external command,\noperable program or batch file.");
                    } else {
                    EchoLine(commands.get(args[0]));
                    }
                } else {
                    SendMessage(getDisplayable(args, 0));
                }
        }
    }
    
