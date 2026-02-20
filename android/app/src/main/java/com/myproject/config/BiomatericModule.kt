package com.myproject.config

import android.widget.Toast
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BiomatericModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BiomatericModule"
    }

    @ReactMethod
    fun isBiometricAvailable(promise: Promise) {
        try {
            val biometricManager = BiometricManager.from(reactApplicationContext)
            val canAuthenticate = biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG)
            Toast.makeText(reactApplicationContext, "Can Authenticate: $canAuthenticate", Toast.LENGTH_SHORT).show()
            promise.resolve(canAuthenticate == BiometricManager.BIOMETRIC_SUCCESS)
        } catch (e: Exception) {
            Toast.makeText(reactApplicationContext, "Error: ${e.message}", Toast.LENGTH_SHORT).show()
            promise.reject("Error: ${e.message}")


        }
    }

    @ReactMethod
    fun showBiometricPrompt(title: String, subtitle: String,promise: Promise) {
        val activity = reactApplicationContext.currentActivity
        if (activity == null) {
            Toast.makeText(reactApplicationContext, "Activity is null", Toast.LENGTH_SHORT).show()
            return
        }

        if (activity !is FragmentActivity) {
            Toast.makeText(reactApplicationContext, "Activity is not a FragmentActivity", Toast.LENGTH_SHORT).show()
            return
        }

        activity.runOnUiThread {
            val executor = ContextCompat.getMainExecutor(activity)
            val biometricPrompt = BiometricPrompt(
                activity,
                executor,
                object : BiometricPrompt.AuthenticationCallback() {
                    override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                        super.onAuthenticationSucceeded(result)
                        promise.resolve(true)
                        Toast.makeText(reactApplicationContext, "Authentication succeeded", Toast.LENGTH_SHORT).show()
                    }

                    override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                        super.onAuthenticationError(errorCode, errString)
                        Toast.makeText(reactApplicationContext, "Authentication error: $errString", Toast.LENGTH_SHORT).show()
                    promise.resolve(false)
                    }

                    override fun onAuthenticationFailed() {
                        super.onAuthenticationFailed()
                        Toast.makeText(reactApplicationContext, "Authentication failed", Toast.LENGTH_SHORT).show()
                    promise.resolve(false)
                    }
                }
            )

            val promptInfo = BiometricPrompt.PromptInfo.Builder()
                .setTitle(title)
                .setSubtitle(subtitle)
                .setNegativeButtonText("Cancel")
                .build()

            biometricPrompt.authenticate(promptInfo)
        }
    }
    @ReactMethod
    fun getBiometricMethod(promise: Promise){
        val biometricManager = BiometricManager.from(reactApplicationContext)
        val authenticators = BiometricManager.Authenticators.BIOMETRIC_STRONG


        val packageManager = reactApplicationContext.packageManager

        if (packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_FINGERPRINT)) {
            promise.resolve("Fingerprint")
        } else if (packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_FACE)) {
            promise.resolve("Face ID")
        } else if (packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_IRIS)) {
            promise.resolve("Iris")
        } else {
            promise.resolve("Unknown Biometric")
        }
    }
}
