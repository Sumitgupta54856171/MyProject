package com.myproject

import com.myproject.config.BiomatericModule
import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import java.util.HashMap

class Biomatricpackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == "BiomatericModule") {
            BiomatericModule(reactContext)
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
            val isTurboModule = true
            moduleInfos["BiomatericModule"] = ReactModuleInfo(
                "BiomatericModule",
                "com.myproject.config.BiomatericModule",
                false, // canOverrideExistingModule
                false, // needsEagerInit (false means lazy loaded)
                true,  // hasConstants
                false, // isCxxModule
                isTurboModule // isTurboModule (YES!)
            )
            moduleInfos
        }
    }
}
