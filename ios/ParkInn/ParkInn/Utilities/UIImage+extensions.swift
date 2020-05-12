//
//  UIImage+extensions.swift
//  ParkInn
//
//  Created by Kyle Aquino on 3/4/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

extension UIImageView {
    /// Loads the image stored at the specified URL
    func load(url: URL) {
        DispatchQueue.global().async { [weak self] in
            if let data = try? Data(contentsOf: url) {
                if let image = UIImage(data: data) {
                    DispatchQueue.main.async {
                        self?.image = image
                    }
                }
            }
        }
    }

    static func load(url: URL, completion: @escaping (UIImage?) -> ()) {
        DispatchQueue.global().async {
            if let data = try? Data(contentsOf: url) {
                if let image = UIImage(data: data) {
                    completion(image)
                } else {
                    completion(nil)
                }
            }
        }
    }
}
