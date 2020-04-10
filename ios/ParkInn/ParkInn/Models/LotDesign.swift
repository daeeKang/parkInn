//
//  LotDesign.swift
//  SpriteKitUIKitTesting
//
//  Created by Kyle Aquino on 4/4/20.
//  Copyright © 2020 Kyle Aquino. All rights reserved.
//

import Foundation

struct LotDesign: Decodable {
    let walls: [Wall]
    let parkingLines: [ParkingLine]
    let parkingLabel: [ParkingLabel]
}

struct Wall: Decodable {
    let x: Double
    let y: Double
    let width: Double
    let height: Double

    var translatedX: Double {
//        return (x + 5000) / 10
        return (x + 5000)
    }

    var translatedY: Double {
//        return (y + 5000) / 10
        return (y + 5000)
    }

    var translatedWidth: Double {
//        return abs(width / 10)
        return abs(width)
    }

    var translatedHeight: Double {
//        return abs(height / 10)
        return abs(height)
    }

    var positiveWidth: Bool {
        return width >= 0
    }

    var positiveHeight: Bool {
        return height >= 0
    }
}

struct ParkingLine: Decodable {
    let x1: Double
    let y1: Double
    let x2: Double
    let y2: Double

    var translatedX1: Double {
        return x1 + 5000
    }

    var translatedY1: Double {
        return y1 + 5000
    }

    var translatedX2: Double {
        return x2 + 5000
    }

    var translatedY2: Double {
        return y2 + 5000
    }
}

struct ParkingLabel: Decodable {
    let x: Double
    let y: Double
    let width: Double
    let height: Double
    let text: Double?
    let size: Double?
    let fill: String?
    let rotation: Double?


    var translatedX: Double {
    //        return (x + 5000) / 10
            return (x + 5000)
        }

        var translatedY: Double {
    //        return (y + 5000) / 10
            return (y + 5000)
        }

        var translatedWidth: Double {
    //        return abs(width / 10)
            return abs(width)
        }

        var translatedHeight: Double {
    //        return abs(height / 10)
            return abs(height)
        }

        var positiveWidth: Bool {
            return width >= 0
        }

        var positiveHeight: Bool {
            return height >= 0
        }
}


