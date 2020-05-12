//
//  StaffProfile.swift
//  ParkInn
//
//  Created by Kyle Aquino on 5/3/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import Foundation

struct StaffProfile: Decodable {
    let username: String
    let firstName: String
    let lastName: String
    let companyID: String
    let companyName: String
    let admin: Bool

    var fullName: String {
        return "\(firstName) \(lastName)"
    }

    enum CodingKeys: String, CodingKey {
        case username, name, admin, companyName
        case companyID = "companyid"
    }

    enum NameCodingKeys: String, CodingKey {
        case firstName = "givenName"
        case lastName = "familyName"
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        username = try container.decode(String.self, forKey: CodingKeys.username)
        companyID = try container.decode(String.self, forKey: CodingKeys.companyID)
        companyName = try container.decode(String.self, forKey: CodingKeys.companyName)
        admin = try container.decode(Bool.self, forKey: CodingKeys.admin)
        let name = try container.nestedContainer(keyedBy: NameCodingKeys.self, forKey: .name)
        firstName = try name.decode(String.self, forKey: .firstName)
        lastName = try name.decode(String.self, forKey: .lastName)
    }

}



/*
 username: {type: String, required: true, unique: true},
 name: {
     givenName: {type: String, required: true},
     familyName: {type: String, requred: true},
 },
 employeeid: String,
 companyid: {type: String, required: true},
 companyName: {type: String, required: true},
 admin: {type: Boolean, required: true},

 */
