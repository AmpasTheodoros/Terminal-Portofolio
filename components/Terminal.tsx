"use client"
import React, { useState, useEffect, useRef, FormEvent, ChangeEvent, ReactNode } from 'react';
import AnimatedText from './AnimatedText';
import SkillsChart from './SkillsChart';

const COMMANDS = {
  help: 'Shows this help message',
  about: 'Displays information about me',
  skills: 'Lists my technical skills',
  projects: 'Shows my projects',
  contact: 'Displays my contact information',
  education: 'Shows my educational background',
  download: 'Downloads my resume',
  'skills-chart': 'Displays a chart of my top skills',
  clear: 'Clears the terminal',
};

const ASCII_BANNER = `
 _____                   _             _ 
|  __ \\                 | |           | |
| |  | | _____   ____ _ | |  ___  ___ | |
| |  | |/ _ \\ \\ / / _\` || | / _ \\/ _ \\| |
| |__| |  __/\\ V / (_| || ||  __/  __/|_|
|_____/ \\___| \\_/ \\__,_||_| \\___|\\___|(_)
                                         
Welcome to my portfolio! Type 'help' for available commands.
`;

type OutputItem = string | ReactNode;

const Terminal: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<OutputItem[]>([ASCII_BANNER]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [secretNumber, setSecretNumber] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      inputRef.current?.focus();
    }, []);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    };
  
    const handleInputSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmedInput = input.trim().toLowerCase();

      if (isPlaying) {
        handleGameInput(trimmedInput);
      } else {
        const commandOutput = processCommand(trimmedInput);
        setOutput((prev) => [...prev, `$ ${input}`, commandOutput]);
      }

      setInput('');
    };

    const handleGameInput = (guess: string) => {
      const number = parseInt(guess);
      setAttempts((prev) => prev + 1);

      if (isNaN(number)) {
          setOutput((prev) => [...prev, 'Please enter a valid number.']);
      } else if (number < secretNumber) {
          setOutput((prev) => [...prev, `${number} is too low. Try again!`]);
      } else if (number > secretNumber) {
          setOutput((prev) => [...prev, `${number} is too high. Try again!`]);
      } else {
          setOutput((prev) => [
              ...prev,
              `Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts!`,
              'Game over. You can start a new game by typing "game" or continue with other commands.'
          ]);
          setIsPlaying(false);
      }
  };

    const processCommand = (command: string): OutputItem => {
      setIsAnimating(true);
      switch (command) {
        case 'help':
          return Object.entries(COMMANDS).map(([cmd, desc]) => `${cmd}: ${desc}`).join('\n');
        case 'about':
          return "I'm a passionate developer with experience in web technologies.";
        case 'skills':
          return "JavaScript, TypeScript, React, Next.js, Node.js, HTML, CSS, Git";
        case 'projects':
          return "1. E-commerce platform\n2. Weather app\n3. Task management system";
        case 'contact':
          return "Email: your.email@example.com\nGitHub: github.com/yourusername\nLinkedIn: linkedin.com/in/yourusername";
        case 'education':
          return "• Bachelor of Science in Computer Science, University of Technology (2018-2022)\n• Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems";
        case 'download':
          window.open('/api/download', '_blank');
          return 'Downloading resume...';
        case 'skills-chart':
          return <SkillsChart />;
        case 'clear':
          setOutput([]);
          return '';
        default:
          return `Command not found: ${command}. Type "help" for available commands.`;
      }
    };
  
    return (
      <div className="bg-black text-green-400 font-mono p-4 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="mb-4">
              {output.map((item, index) => (
                  <pre key={index} className="whitespace-pre-wrap">
                      {typeof item === 'string' && index === output.length - 1 && isAnimating ? (
                          <AnimatedText text={item} speed={30} />
                      ) : (
                          item
                      )}
                  </pre>
              ))}
          </div>
          <form onSubmit={handleInputSubmit} className="flex">
              <span className="mr-2">$</span>
              <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  ref={inputRef}
                  className="bg-transparent flex-grow focus:outline-none"
              />
          </form>
      </div>
  );
};

export default Terminal;