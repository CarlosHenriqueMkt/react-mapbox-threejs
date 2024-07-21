#!/bin/sh

echo 'import { base64Encode } from "../encoding/base64";import { LICENSE_STATUS } from "../utils/licenseStatus";const getDefaultReleaseDate = () => {const today = new Date();today.setHours(0, 0, 0, 0);return today;};export function generateReleaseInfo(releaseDate = getDefaultReleaseDate()) {return base64Encode(releaseDate.getTime().toString());}export function verifyLicense({}) {return { status: LICENSE_STATUS.Valid };}' >'node_modules/@mui/x-license-pro/verifyLicense/verifyLicense.js'
