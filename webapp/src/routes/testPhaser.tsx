// src/components/Game.js
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const TestPhaser = () => {
  const gameRef = useRef(null);

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  function preload() {
    this.load.image('logo', '/assets/logo.png');
  }

  function create() {
    const logo = this.add.image(400, 300, 'logo');
    this.tweens.add({
      targets: logo,
      y: 100,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    });
  }

  function update() {
  }

  useEffect(() => {
    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return (
    <div>
      <h1>My Phaser Game in React</h1>
      <div id="phaser-game" />
    </div>
  );
};

export default TestPhaser;
