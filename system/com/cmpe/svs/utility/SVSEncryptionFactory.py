#Security for Smart Visitor System

from django.core import signing
from simplecrypt import encrypt, decrypt
from binascii import hexlify, unhexlify

debug = 1

#Signage
#required parameter: text
def svsSign(text, saltVal = 'default', requiresHexlify = False):
	if(requiresHexlify):
		text = hexlify(text)
	signer = signing.Signer(salt = saltVal)
	signedText = signer.sign(text)
	if(debug):
		print(text)
		print(signedText)
	return signedText
	
#Unsigning
#required parameter: text
def svsUnsign(signedText, saltVal = 'default', requiresHexlify = False):
	
	signer = signing.Signer(salt = saltVal)
	try:
		text = signer.unsign(signedText)
		if(debug):
			print(signedText)
			print(text)
		if(requiresHexlify):
			return unhexlify(text)
		else:
			return text
	except signing.BadSignature:
		print("Tampering Detected!")
		return "null"

#Encryption
#required parameter: plainText
#input: string
#output: string or bytes
def svsEncrypt(plainText, keyVal = 'default'):
	cipherText = encrypt(keyVal, plainText.encode('utf8'))
	if(debug):
		print(plainText)
		print(cipherText)
	return cipherText
	
#Decryption
#required parameter: cipherText
#input: bytes
#output: string or bytes
def svsDecrypt(cipherText, keyVal = 'default', string = True):
	plainText = decrypt(keyVal, cipherText)
	if(debug):
		print(cipherText)
		print(plainText)	
	if string:
		return plainText.decode('utf8')
	else:
		return plainText
		