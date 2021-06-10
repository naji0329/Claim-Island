export const traits = {
    shellShape: {
        length: 3,
        val: '',
        shapes: {
            common: {
                dropRate: 0.25,
                pearlBoost: false
            },
            heart: {
                dropRate: 0.08,
                pearlBoost: {
                    shape: 'ringed',
                    boost: 0.3
                }
            },
            spade: {
                dropRate: 0.1,
                pearlBoost: false
            },
            bigMouth: {
                dropRate: 0.08,
                pearlBoost: {
                    shape: 'ringed',
                    boost: 0.3
                }
            },
            threeLipped: {
                dropRate: 0.1,
                pearlBoost: false
            },
            fan: {
                dropRate: 0.15,
                pearlBoost: false
            },
            octo: {
                dropRate: 0.1,
                pearlBoost: false
            },
            sharpTooth: {
                dropRate: 0.03,
                pearlBoost: {
                    shape: 'drop',
                    boost: 0.3
                }
            },
            barnacle: {
                dropRate: 0.06,
                pearlBoost: {
                    shape: 'oval',
                    boost: 0.3
                }
            },
            hamburger: {
                dropRate: 0.05,
                pearlBoost: {
                    shape: 'button',
                    boost: 0.3
                }
            },
            maxima: {
                dropRate: 0,
                pearlBoost: {
                    shape: 'round',
                    boost: 0.5
                }
            },
        }
    },
    tongue: {
        length: 3,
        val: '',
        shapes: {
            common: {
                dropRate: 0.5,
                pearlBoost: false
            },
            forked: {
                dropRate: 0.25,
                pearlBoost: false
            },
            heart: {
                dropRate: 0.15,
                pearlBoost: {
                    shape: 'button',
                    boost: 0.2
                }
            },
            star: {
                dropRate: 0.08,
                pearlBoost: {
                    shape: 'drop',
                    boost: 0.2
                }
            },
            spiral: {
                dropRate: 0.02,
                pearlBoost: {
                    shape: 'round',
                    boost: 0.2
                }
            }
        }
    },
    tongueColour: {
        length: 3,
        colours: {
            red: {
                val: [360, 205, -130],
                minAdj: [0, -20, -70],
                maxAdj: [0, 45, 20],
                dropRate: 0.07,
                pearlBoost: false
            },
            blue: {
                val: [142, 170, -120],
                minAdj: [-12, -100, -100],
                maxAdj: [18, 80, 100],
                dropRate: 0.04,
                pearlBoost: {
                    bodycolour: 'blue',
                    boost: 0.2
                }
            },
            green: {
                val: [215, 170, -120],
                minAdj: [-25, -130, -80],
                maxAdj: [60, 80, 90],
                dropRate: 0.12,
                pearlBoost: {
                    bodycolour: 'green',
                    boost: 0.2
                }
            },
            yellow: {
                val: [300, 170, 0],
                minAdj: [-10, -170, -75],
                maxAdj: [15, 45, 40],
                dropRate: 0.15,
                pearlBoost: {
                    bodycolour: 'gold',
                    boost: 0.2
                }
            },
            white: {
                val: [0, -200, 20],
                minAdj: [0, 0, -20],
                maxAdj: [0, 0, 30],
                dropRate: 0.2,
                pearlBoost: {
                    bodycolour: 'white',
                    boost: 0.2
                }
            },
            black: {
                val: [0, -300, -330],
                minAdj: [0, 0, -70],
                maxAdj: [0, 0, 50],
                dropRate: 0.01,
                pearlBoost: {
                    bodycolour: 'black',
                    boost: 0.2
                }
            },
            purple: {
                val: [80, 170, -120],
                minAdj: [-20, -120, -80],
                maxAdj: [15, 50, 120],
                dropRate: 0.05,
                pearlBoost: {
                    bodycolour: 'aubergine',
                    boost: 0.2
                }
            },
            pink: {
                val: [15, 80, 0],
                minAdj: [-15, -30, -100],
                maxAdj: [15, 35, 20],
                dropRate: 0.09,
                pearlBoost: {
                    bodycolour: 'pink',
                    boost: 0.2
                }
            },
            orange: {
                val: [340, 170, -70],
                minAdj: [-15, -40, -60],
                maxAdj: [5, 30, 20],
                dropRate: 0.12,
                pearlBoost: false
            },
            brown: {
                val: [360, 150, -270],
                minAdj: [-30, -50, -50],
                maxAdj: [5, 50, 70],
                dropRate: 0.15,
                pearlBoost: {
                    bodycolour: 'brown',
                    boost: 0.2
                }
            }
        }
    },
    shellColour: {
        length: 3,
        colours: {
            red: {
                val: [360, 205, -130],
                minAdj: [0, -20, -70],
                maxAdj: [0, 45, 20],
                dropRate: 0.07,
                pearlBoost: false
            },
            blue: {
                val: [142, 170, -120],
                minAdj: [-12, -100, -100],
                maxAdj: [18, 80, 100],
                dropRate: 0.04,
                pearlBoost: {
                    bodycolour: 'blue',
                    boost: 0.2
                }
            },
            green: {
                val: [215, 170, -120],
                minAdj: [-25, -130, -80],
                maxAdj: [60, 80, 90],
                dropRate: 0.12,
                pearlBoost: {
                    bodycolour: 'green',
                    boost: 0.2
                }
            },
            yellow: {
                val: [300, 170, 0],
                minAdj: [-10, -170, -75],
                maxAdj: [15, 45, 40],
                dropRate: 0.15,
                pearlBoost: {
                    bodycolour: 'gold',
                    boost: 0.2
                }
            },
            white: {
                val: [0, -200, 20],
                minAdj: [0, 0, -20],
                maxAdj: [0, 0, 30],
                dropRate: 0.2,
                pearlBoost: {
                    bodycolour: 'white',
                    boost: 0.2
                }
            },
            black: {
                val: [0, -300, -330],
                minAdj: [0, 0, -70],
                maxAdj: [0, 0, 50],
                dropRate: 0.01,
                pearlBoost: {
                    bodycolour: 'black',
                    boost: 0.2
                }
            },
            purple: {
                val: [80, 170, -120],
                minAdj: [-20, -120, -80],
                maxAdj: [15, 50, 120],
                dropRate: 0.05,
                pearlBoost: {
                    bodycolour: 'aubergine',
                    boost: 0.2
                }
            },
            pink: {
                val: [15, 80, 0],
                minAdj: [-15, -30, -100],
                maxAdj: [15, 35, 20],
                dropRate: 0.09,
                pearlBoost: {
                    bodycolour: 'pink',
                    boost: 0.2
                }
            },
            orange: {
                val: [340, 170, -70],
                minAdj: [-15, -40, -60],
                maxAdj: [5, 30, 20],
                dropRate: 0.12,
                pearlBoost: false
            },
            brown: {
                val: [360, 150, -270],
                minAdj: [-30, -50, -50],
                maxAdj: [5, 50, 70],
                dropRate: 0.15,
                pearlBoost: {
                    bodycolour: 'brown',
                    boost: 0.2
                }
            }
        }
    },
    innerColour: {
        length: 3,
        colours: {
            red: {
                val: [360, 205, -130],
                minAdj: [0, -20, -70],
                maxAdj: [0, 45, 20],
                dropRate: 0.07,
                pearlBoost: false
            },
            blue: {
                val: [142, 170, -120],
                minAdj: [-12, -100, -100],
                maxAdj: [18, 80, 100],
                dropRate: 0.04,
                pearlBoost: {
                    bodycolour: 'blue',
                    boost: 0.3
                }
            },
            green: {
                val: [215, 170, -120],
                minAdj: [-25, -130, -80],
                maxAdj: [60, 80, 90],
                dropRate: 0.12,
                pearlBoost: {
                    bodycolour: 'green',
                    boost: 0.3
                }
            },
            yellow: {
                val: [300, 170, 0],
                minAdj: [-10, -170, -75],
                maxAdj: [15, 45, 40],
                dropRate: 0.15,
                pearlBoost: {
                    bodycolour: 'gold',
                    boost: 0.3
                }
            },
            white: {
                val: [0, -200, 20],
                minAdj: [0, 0, -20],
                maxAdj: [0, 0, 30],
                dropRate: 0.2,
                pearlBoost: {
                    bodycolour: 'white',
                    boost: 0.3
                }
            },
            black: {
                val: [0, -300, -330],
                minAdj: [0, 0, -70],
                maxAdj: [0, 0, 50],
                dropRate: 0.01,
                pearlBoost: {
                    bodycolour: 'black',
                    boost: 0.3
                }
            },
            purple: {
                val: [80, 170, -120],
                minAdj: [-20, -120, -80],
                maxAdj: [15, 50, 120],
                dropRate: 0.05,
                pearlBoost: {
                    bodycolour: 'aubergine',
                    boost: 0.3
                }
            },
            pink: {
                val: [15, 80, 0],
                minAdj: [-15, -30, -100],
                maxAdj: [15, 35, 20],
                dropRate: 0.09,
                pearlBoost: {
                    bodycolour: 'pink',
                    boost: 0.3
                }
            },
            orange: {
                val: [340, 170, -70],
                minAdj: [-15, -40, -60],
                maxAdj: [5, 30, 20],
                dropRate: 0.12,
                pearlBoost: false
            },
            brown: {
                val: [360, 150, -270],
                minAdj: [-30, -50, -50],
                maxAdj: [5, 50, 70],
                dropRate: 0.15,
                pearlBoost: {
                    bodycolour: 'brown',
                    boost: 0.3
                }
            }
        }
    },
    lipColour: {
        length: 3,
        colours: {
            red: {
                val: [360, 205, -130],
                minAdj: [0, -20, -70],
                maxAdj: [0, 45, 20],
                dropRate: 0.07,
                pearlBoost: false
            },
            blue: {
                val: [142, 170, -120],
                minAdj: [-12, -100, -100],
                maxAdj: [18, 80, 100],
                dropRate: 0.04,
                pearlBoost: {
                    bodycolour: 'blue',
                    boost: 0.1
                }
            },
            green: {
                val: [215, 170, -120],
                minAdj: [-25, -130, -80],
                maxAdj: [60, 80, 90],
                dropRate: 0.12,
                pearlBoost: {
                    bodycolour: 'green',
                    boost: 0.1
                }
            },
            yellow: {
                val: [300, 170, 0],
                minAdj: [-10, -170, -75],
                maxAdj: [15, 45, 40],
                dropRate: 0.15,
                pearlBoost: {
                    bodycolour: 'gold',
                    boost: 0.1
                }
            },
            white: {
                val: [0, -200, 20],
                minAdj: [0, 0, -20],
                maxAdj: [0, 0, 30],
                dropRate: 0.2,
                pearlBoost: {
                    bodycolour: 'white',
                    boost: 0.1
                }
            },
            black: {
                val: [0, -300, -330],
                minAdj: [0, 0, -70],
                maxAdj: [0, 0, 50],
                dropRate: 0.01,
                pearlBoost: {
                    bodycolour: 'black',
                    boost: 0.1
                }
            },
            purple: {
                val: [80, 170, -120],
                minAdj: [-20, -120, -80],
                maxAdj: [15, 50, 120],
                dropRate: 0.05,
                pearlBoost: {
                    bodycolour: 'aubergine',
                    boost: 0.1
                }
            },
            pink: {
                val: [15, 80, 0],
                minAdj: [-15, -30, -100],
                maxAdj: [15, 35, 20],
                dropRate: 0.09,
                pearlBoost: {
                    bodycolour: 'pink',
                    boost: 0.1
                }
            },
            orange: {
                val: [340, 170, -70],
                minAdj: [-15, -40, -60],
                maxAdj: [5, 30, 20],
                dropRate: 0.12,
                pearlBoost: false
            },
            brown: {
                val: [360, 150, -270],
                minAdj: [-30, -50, -50],
                maxAdj: [5, 50, 70],
                dropRate: 0.15,
                pearlBoost: {
                    bodycolour: 'brown',
                    boost: 0.1
                }
            }
        }
    },
    pattern: {
        length: 3,
        val: '',
        styles: {
            none: {
                dropRate: 0.3,
                pearlBoost: false
            },
            hearts: {
                dropRate: 0.06,
                pearlBoost: {
                    shape: 'ringed',
                    boost: 0.2
                }
            },
            flowers: {
                dropRate: 0.07,
                pearlBoost: false
            },
            clovers: {
                dropRate: 0.1,
                pearlBoost: false
            },
            diamonds: {
                dropRate: 0.05,
                pearlBoost: {
                    shape: 'button',
                    boost: 0.2
                }
            },
            stars: {
                dropRate: 0.03,
                pearlBoost: {
                    shape: 'drop',
                    boost: 0.2
                }
            },
            tris: {
                dropRate: 0.08,
                pearlBoost: false
            },
            spades: {
                dropRate: 0.04,
                pearlBoost: {
                    shape: 'button',
                    boost: 0.2
                }
            },
            polkadots: {
                dropRate: 0.06,
                pearlBoost: false
            },
            saint: {
                dropRate: 0.1,
                pearlBoost: {
                    shape: 'oval',
                    boost: 0.2
                }
            },
            exes: {
                dropRate: 0.08,
                pearlBoost: false
            },
            arrows: {
                dropRate: 0.02,
                pearlBoost: {
                    shape: 'drop',
                    boost: 0.2
                }
            },
            moroccan: {
                dropRate: 0.01,
                pearlBoost: {
                    shape: 'round',
                    boost: 0.2
                }
            }
        }
    },
    size: {
        length: 2,
        min: 1,
        max: 100,
        val: ''
    },
    lifespan: {
        length: 2,
        min: 5,
        max: 15,
        val: ''
    },
    glow: {
        length: 3,
        yes: 0.0001
    }
};