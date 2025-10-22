import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY || 'default_secret_key'

export function useSessionEncryption() {

  // Encrypt
  const encryptData = (data) => {
    const stringData = JSON.stringify(data)
    return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString()
  }

  // Decrypt
  const decryptData = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
      return JSON.parse(decryptedString)
    } catch (error) {
      console.error('Decryption failed:', error)
      return null
    }
  }

  // Save (encrypted)
  const saveToSession = (key, value) => {
    const encrypted = encryptData(value)
    sessionStorage.setItem(key, encrypted)
  }

  // Retrieve (decrypted)
  const getFromSession = (key) => {
    const encrypted = sessionStorage.getItem(key)
    if (!encrypted) return null
    return decryptData(encrypted)
  }

  // Remove
  const removeFromSession = (key) => {
    sessionStorage.removeItem(key)
  }

  return {
    encryptData,
    decryptData,
    saveToSession,
    getFromSession,
    removeFromSession
  }
}
