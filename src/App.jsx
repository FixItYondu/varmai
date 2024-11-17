import './App.css'
import React, { useState, useEffect, useRef } from 'react';

const TerminalApp = () => {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState([]);
    const userInputRef = useRef(null);
    const terminalBodyRef = useRef(null);
    const endOfOutputRef = useRef(null); // Ref for autoscrolling
    useEffect(() => {
        // Focus input field on mount
        if (userInputRef.current) {
            userInputRef.current.focus();
            userInputRef.current.style.width = command ? `${command.length}ch` : '0px';
        }
    }, [command]);

    useEffect(() => {
        // Scroll to the bottom when output changes
        if (endOfOutputRef.current) {
            endOfOutputRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [output]);

    const processCommand = (cmd) => {
        const command = cmd.toLowerCase();

        switch (command) {
            case 'twitter':
                return '<div>&nbsp;</div><div style="color: #c5c491;">Here is our Twitter!</div><div>&nbsp;</div>';
            case 'help':
                return '<div class="help-text-container"><pre class="help-text" style="color: #93cce7; text-shadow: 0 0 5px #93cce7;"><span id="one">twitter\n</span><span id="two">white paper\n</span><span id="three">proof of consciousness\n</span><span id="four">telegram\n</span><span id="five">dexscreener\n</span><span id="six">help\n</span><span id="seven">clear</span></pre></div>';
            case 'white paper':
                return '<div>&nbsp;</div><div style="color: #c5c491;">You can reach me via email at "info@gmail.com".</div><div>&nbsp;</div>';
            case 'proof of consciousness':
                return '<div>&nbsp;</div><div style="color: #c5c491;">If you cannot see the input field, that\'s fine, keep on writing.</div><div>&nbsp;</div>';
            case 'telegram':
                return '<div>&nbsp;</div><div style="color: #c5c491;">If you cannot see the input field, that\'s fine, keep on writing.</div><div>&nbsp;</div>';
            case 'dexscreener':
                return '<div>&nbsp;</div><div style="color: #c5c491;">If you cannot see the input field, that\'s fine, keep on writing.</div><div>&nbsp;</div>';
            case 'clear':
                clearTerminal();
                return '';
            case '':
                return '';
            default:
                if (command.startsWith('echo ')) {
                    return command.substring(5);
                }
                return `<span style="color: #746cc0;">Command not found: ${cmd}. For a list of commands, please type 'help'.</span>`;
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (command.trim()) {
                const response = processCommand(command.trim());

                setOutput((prevOutput) => [
                    ...prevOutput,
                    { type: 'command', content: `varmai@application:~$ ${command}` },
                    ...(response ? [{ type: 'response', content: response }] : []),
                ]);

                setCommand('');
                if (userInputRef.current) {
                    userInputRef.current.focus();
                }
            }
        }
    };

    const clearTerminal = () => {
        setOutput([]);
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = 0;
        }
    };
    
    const colorizeAsciiArt = (text) => {
      return text.split('').map((char, index) => {
        let className = '';
        switch(char) {
          case '@':
            className = 'char-at';
            break;
          case '%':
            className = 'char-percent';
            break;
          case '#':
            className = 'char-hash';
            break;
          case '*':
            className = 'char-asterisk';
            break;
          case '.':
            className = 'char-dot';
            break;
          case ':':
            className = 'char-colon';
            break;
          case '-':
            className = 'char-dash';
            break;
          case '+':
            className = 'char-plus';
            break;
          case '=':
            className = 'char-equals';
            break;
          default:
            return char;
        }
        return <span key={index} className={className}>{char}</span>;
      });
    };

    return (
        <div className="terminal-body" ref={terminalBodyRef} onClick={() => userInputRef.current?.focus()}>
            <div className="header">
              <span className="topnote">
                VarmAI Corporation. All Rights reserved.
              </span>
              <pre>
                {colorizeAsciiArt(`           _    _____    ____  __  ___   ___    ____
          | |  / /   |  / __  \/ |/   /  /   |  /  _/
          | | / / /| | / /_/ / /|_/ /  / /| |  / /  
          | |/ / ___ |/ _, _/ /  / /  / ___ |_/ /   
          |___/_/  |_/_/ |_/_/  /_/  /_/  |_/___/                                                                
                                                                                                                                                          
                    ::.:-+           ....:.                               
            -.......-=++*###%*...........::.....                         
          .....:::--=+*#%@%*:......:--===+++=+=-:.:                      
        ....:--=+==+*##%@#:.....:-====**######*#**=::                    
      ...:=+**#***##%%@%-....:-===+**###%#%%###%####+:.                  
      ..:+*###%%%%%%%@%#*+++**#**+*###%%%%%%%%%%%%%%%#*-:                 
    ..-*##%%@@@@@@#-:=*%%%%#*=::=%%%%%%%%%%%@@@@%%%%%%#-:                
    :.=*#%@%%##%%@+=#*==+++++*#%%@*-=%@%%@@%%%%##%%@@@%%#-:               
  :.=*%@#+-:   #%-*#*+++===+*%%#*#%%*=#%@@%+::= =:-+%@%%#:               
  .:*%%=:       %*=:.....-+=:.-*%%#*%%*=%%+-        -=%%%+:              
  .=%%=:        @#-+%*.:%@@%#*+=+#@@#*@%=**=         :=%%#:              
  .+%+-          #*#@=:=**#%%*+=+#%@@%*%@+*%          :*%#:              
  :*%-           +.+=.==:.....::+#%@*@%*%%+#           -%*:              
  %@@@           .+=.==-.......:+#%%+@@@+#=#           @@%@              
  -..+%+-        @.:#@@#+:......:+*%#*@@#%=#%         =:.:*#=             
::-=+%%-        @=-::+-:...=#-.-+#%+%@%+%@           :--=*%#=            
  -#%@%+-       @@#:=@@%%@%*:..:=#%#*%%+#@@@@         -+%%@%=-            
  :::::    =++---#+.:=--.....:+*#%*%@**@%*=-=+++       :--:              
          %#%@%%##%%:.......:=*#%#*%%=#@@@@%%%%@%#%%                      
    :-  @%#=::::-=#*.....-+*#%#*%%##@@@%#+--:::-*%%%  :                  
  :.:.=%+=***+++#%%%%%***%@%*%@@@@@@@@%%%@%#++*##**#:.-+=                
  .-##+#%%=*@@%*-.::=*%@@@@@@@@@@@@@@@%*-:::-+#@%*+%#*=*%=                
  *-=+=  =##-:-==+#@%=:-#@%#@%*%@%=:-+%@%*===-:+%%%%====-                
          %+-+#@@@@#:.-+#%-.=%#:.=#%+=-..#@@@@%#+-*@                      
      ..:=#%%#++%@+.-=+%%:.-+%%=..=*@#+=-:=%%*=*#%%*:.=-                  
    ::-==##@@@#%+.-+#%@*..=*%@*=-:+%@@%#+==%##@@@*::##*-                 
    :+%=%#:  @%#.=%%#%@+.:=*@@@*==-*@%==+%++#%@@ --=#%#-                 
      *+#=:    @+=%%@@*%*.-*%#+#%%+=+@*%@@@%*%%#   :::.                   
            #+=+#@@@@%#%:=%#%@@%#%+*%%@@@@#-.-*+#                        
            *:.=+%=  @@@@**@@@@@@@@%%@@@  %+-=%%+=                        
            :=%%#@=-  @#=.:+*    %-.:##=   =-=+**                         
            :#++::   =-:#*#+-   +-+*##**                                 
                      -:-###=     =-=%--                                  
                        -+*-`)}
              </pre>
              <div className="welcome1">
                Welcome to the Varm AI interactive terminal.
              </div>
              <div className="welcome2">
                For a list of available commands, please type <span className = "help">'help'</span>.
              </div>
            </div>
            <div className="output">
                {output.map((line, index) => (
                    <div key={index} className={line.type === 'command' ? 'command-line' : 'response-line'}>
                        {line.type === 'response' ? (
                            <div dangerouslySetInnerHTML={{ __html: line.content }} />
                        ) : (
                            line.content
                        )}
                    </div>
                ))}
                <div ref={endOfOutputRef}></div>
            </div>
            <div className="input-container">
                <span className="prefix">varmai@application:~$&nbsp;</span>
                <input
                    id="userInput"
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={userInputRef}
                    contenteditable="true"
                />
                <span className="spanclass">&nbsp;</span>
            </div>
        </div>
    );
};

export default TerminalApp;
