import Foundation
import LocalAuthentication

@objc(BiomatericModule)
class BiomatericModule: NSObject {
  
  @objc
  func isBiometricAvailable(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let context = LAContext()
    var error: NSError?
    let canAuth = context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error)
    resolve(canAuth)
  }

  @objc
  func showBiometricPrompt(_ title: String, subtitle: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let context = LAContext()
    context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: title) { success, _ in
      DispatchQueue.main.async { resolve(success) }
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool { return true }
}