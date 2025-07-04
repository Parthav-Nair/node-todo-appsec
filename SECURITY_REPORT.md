# 🔐 Security Audit Summary – node-todo-appsec

## Tools Used
- SonarCloud (SAST)
- Snyk (SCA)
- Manual OWASP Top 10 Checklist

## Vulnerabilities Before Fixes
| Type       | Description                           | Severity | OWASP Ref |
|------------|---------------------------------------|----------|-----------|
| SAST       | Missing input validation              | High     | A1        |
| SAST       | Hardcoded Mongo URI                   | High     | A3        |
| SCA        | Outdated `express` and `mongoose`     | Medium   | A9        |
| Manual     | No error handling on DB writes        | Medium   | A5        |

## Remediations
- All secrets moved to `.env`
- Input validation added using `express-validator`
- Outdated dependencies updated using `npm audit fix`
- Try-catch blocks added for database operations

## SonarCloud Snapshot (Before & After)
> Screenshot 1: 3 Security Issues Detected  
> Screenshot 2: 0 Security Issues After Fixes

## Status: ✅ Completed