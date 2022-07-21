# react-decode-animation

> Decode effect typing animation for React.

[![NPM](https://img.shields.io/npm/v/react-decode-animation.svg)](https://www.npmjs.com/package/react-decode-animation) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-decode-animation
```

## Usage

```tsx
import React, { useRef } from 'react'
import DecodeAnimation from 'react-decode-animation'

function App() {
  const ref = useRef(null);
  return (
    <div>
      <DecodeAnimation
        ref={ref}
        text={"This is an animation Example"}
      />
      <div>
        <button onClick={() => {ref.current?.play()}}>Play</button>
        <button onClick={() => ref.current?.pause()}>Pause</button>
        <button onClick={() => ref.current?.reset()}>Reset</button>
      </div>
    </div>
  );
}
```

## License

MIT © [MrGGTo](https://github.com/MrGGTo)
