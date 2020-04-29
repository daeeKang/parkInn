//
//  CustomerProfile.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/29/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import Foundation

struct CustomerProfile: Decodable {
    let username: String
    let firstName: String
    let lastName: String
    let cars: [Car]

    enum CodingKeys: String, CodingKey {
        case username, name
        case cars = "car"
    }

    enum NameCodingKeys: String, CodingKey {
        case firstName = "givenName"
        case lastName = "familyName"
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        username = try container.decode(String.self, forKey: CodingKeys.username)
        cars = try container.decode([Car].self, forKey: .cars)
        let name = try container.nestedContainer(keyedBy: NameCodingKeys.self, forKey: .name)
        firstName = try name.decode(String.self, forKey: .firstName)
        lastName = try name.decode(String.self, forKey: .lastName)
    }

}

struct Car: Decodable {
    let color: String
    let license: String
    let make: String
    let model: String
}

/*
 username: {type: String, required: true, unique: true},
 name: {
     givenName: {type: String, required: true},
     familyName: {type: String, requred: true},
 },
 status: {type: String, default: null},
 reservation: {type: Date, default: null},
 car: [{
     color: String,
     license: String,
     make: String,
     model: String,
 }]
 */
