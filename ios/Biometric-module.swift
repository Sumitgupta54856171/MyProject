import Foundation
import LocalAuthentication

@objc(BiomatericModule)
class BiomatericModule: NSObject {

  @objc
  func isBiometricAvailable(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let context = LAContext()
    var error: NSError?

    if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
      resolve(true)
    } else {
      resolve(false)
    }
  }

  @objc
  func showBiometricPrompt(
    _ title: String,
    subtitle: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let context = LAContext()

    context.evaluatePolicy(
      .deviceOwnerAuthenticationWithBiometrics,
      localizedReason: subtitle
    ) { success, error in

      DispatchQueue.main.async {
        if success {
          resolve(true)
        } else {
          reject("AUTH_FAILED", error?.localizedDescription ?? "Authentication failed", error)
        }
      }
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}