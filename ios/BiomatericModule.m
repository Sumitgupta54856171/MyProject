#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BiomatericModule, NSObject)

RCT_EXTERN_METHOD(isBiometricAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(showBiometricPrompt:(NSString *)title
                  subtitle:(NSString *)subtitle
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end 