//
//  DisplayVC.swift
//  ParkInn
//
//  Created by Leonardo Batista on 3/22/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import UIKit

class DisplayVC: UIViewController {

    @IBOutlet weak var showImage: UIImageView!
    
    var image = UIImage()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        showImage.image = image
        
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
