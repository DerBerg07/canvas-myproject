let circleArr = [
    {
        ID: 0,
        posX: 200,
        posY: 50,
        layer: 1,
        childrenCirclesID: [1 , 2 ]

    },
    {
        ID: 1,
        posX: 250,
        posY: 100,
        layer: 1,
        childrenCirclesID: [3 , 4 , 5]
    },
    {
        ID: 2,
        posX: 150,
        posY: 100,
        layer: 1,
        childrenCirclesID: []
    },
    {
        ID: 3,
        posX:300,
        posY: 150,
        layer: 1,
        childrenCirclesID: []
    },
    {
        ID: 4,
        posX: 100,
        posY: 150,
        layer: 1,
        childrenCirclesID: []
    },
    {
        ID: 5,
        posX: 200,
        posY: 50,
        layer: 1,
        childrenCirclesID: [6 , 7 ]
    },
    {
        ID: 6,
        posX: 200,
        posY: 150,
        layer: 1,
        childrenCirclesID: [1 , 3 ]
    },
    {
        ID: 7,
        posX: 175,
        posY: 250,
        layer: 1,
        childrenCirclesID: [8 , 9 ]
    },
    {
        ID: 8,
        posX: 75,
        posY: 250,
        layer: 1,
        childrenCirclesID: []
    },
    {
        ID: 9,
        posX:100,
        posY: 300,
        layer: 1,
        childrenCirclesID: []
    },
    {
        ID: 10,
        posX:250,
        posY: 250,
        layer: 2,
        childrenCirclesID: [11, 12]
    },
    {
        ID: 11,
        posX:200,
        posY: 300,
        layer: 2,
        childrenCirclesID: []
    },
    {
        ID: 12,
        posX:300,
        posY: 300,
        layer: 2,
        childrenCirclesID: []
    },



]

console.log(circleArr[0].childrenCirclesID);