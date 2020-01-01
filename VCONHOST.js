const token = "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNjMmExYzczN2E3OTUxZTU1MWVhOTNkNDE4ZGJiOGFlNzgzODE2NTI1M2ViNDc0ZTM3ODk0OTA5Y2UwMDM1Y2RkMzU3ZjYyN2ZhOTY4YTJhIn0.eyJhdWQiOiI4IiwianRpIjoiM2MyYTFjNzM3YTc5NTFlNTUxZWE5M2Q0MThkYmI4YWU3ODM4MTY1MjUzZWI0NzRlMzc4OTQ5MDljZTAwMzVjZGQzNTdmNjI3ZmE5NjhhMmEiLCJpYXQiOjE1Nzc5MTIxNTgsIm5iZiI6MTU3NzkxMjE1OCwiZXhwIjoxNjA5NTM0NTU4LCJzdWIiOiIyNjIiLCJzY29wZXMiOltdfQ.FmwgCzpT1jaeQlM4th5tm7cFxUJY_VZJy3kf5JEdk7xFM6e_8J6rkXX-p9udTIXYwQB9PyDhpkyvXh2FqGq8Ny8VZbNp5GUO5_-tcfyuSBQnmYvHAnYOe6rDvHt6X7hYr13Uigh2jix7Dhco6laBuHuahEl2CRVLuk72B0Fbl-HXcWIXmYOqmXbcza2qQMQycW-NhwxvaT6jG0n7ywYw8pWaNypBpnUfYrN0gSktdUYAl6Hy96n-2Zitbofam4gH4C-nRLfJ6T_gSuTb8ARxc1oaKvKapTUbSR_3gU48wojXO86EzbFzl5oKG8-t_tiQY_q_NfLSurr0BpA1MJk1-i7eB0-XwivrdyB4eWyU0nGxihb2KBJgUJkYYYWLHGd8PSWe08ozQktTruEV5ovMz5mjlv08WeC1NiHxIvokeumBiF3T5uptrR2ZJwFltrFMJBhLMkQigQsN0sfduWOzx5xvW9V4RmXkHqp0PcK57VGWcKlKdsfMHg20Y4HTZNgblnh1_HQTE18dS3ilRy8U0LTk4FcKfgIS24CYuWzcD1npQo4LXa7613vRWrJyoLyA5Z0vC7H0ucmA-NSzP_5r0t4RpiiXpU0Zmg_POeU8FT1jntoOwg-yFy_RuaVf5OSPbw9Dxx3UhmVLfRwmuUL4AJVVeaJqQJXJ-J_jfUTyR2Y";
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
    if(codes.length === 1) {
        document.body.style.color = "silver";
        document.body.style.backgroundColor = "black";
        return
    }
    codes = LowerCase(codes);
    if (colors.has(codes[1])) {
        document.body.style.color = colors.get(codes[1]);
    } else {
       return HELP("color");
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
    
