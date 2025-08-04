# Using Gemini CLI for Large Codebase Analysis

When analyzing large codebases or multiple files that might exceed context limits, use the Gemini CLI with its massive
context window. Use `gemini -p` to leverage Google Gemini's large context capacity.

## File and Directory Inclusion Syntax

Use the `@` syntax to include files and directories in your Gemini prompts. The paths should be relative to WHERE you run the
  gemini command:

### Examples:

**Single file analysis:**
gemini -p "@src/main.py Explain this file's purpose and structure"

Multiple files:
gemini -p "@package.json @src/index.js Analyze the dependencies used in the code"

Entire directory:
gemini -p "@src/ Summarize the architecture of this codebase"

Multiple directories:
gemini -p "@src/ @tests/ Analyze test coverage for the source code"

Current directory and subdirectories:
gemini -p "@./ Give me an overview of this entire project"

# Or use --all_files flag:
gemini --all_files -p "Analyze the project structure and dependencies"

Implementation Verification Examples

Check if a feature is implemented:
gemini -p "@src/ @lib/ Has dark mode been implemented in this codebase? Show me the relevant files and functions"

Verify authentication implementation:
gemini -p "@src/ @middleware/ Is JWT authentication implemented? List all auth-related endpoints and middleware"

Check for specific patterns:
gemini -p "@src/ Are there any React hooks that handle WebSocket connections? List them with file paths"

Verify error handling:
gemini -p "@src/ @api/ Is proper error handling implemented for all API endpoints? Show examples of try-catch blocks"

Check for rate limiting:
gemini -p "@backend/ @middleware/ Is rate limiting implemented for the API? Show the implementation details"

Verify caching strategy:
gemini -p "@src/ @lib/ @services/ Is Redis caching implemented? List all cache-related functions and their usage"

Check for specific security measures:
gemini -p "@src/ @api/ Are SQL injection protections implemented? Show how user inputs are sanitized"

Verify test coverage for features:
gemini -p "@src/payment/ @tests/ Is the payment processing module fully tested? List all test cases"

When to Use Gemini CLI

Use gemini -p when:
- Analyzing entire codebases or large directories
- Comparing multiple large files
- Need to understand project-wide patterns or architecture
- Current context window is insufficient for the task
- Working with files totaling more than 100KB
- Verifying if specific features, patterns, or security measures are implemented
- Checking for the presence of certain coding patterns across the entire codebase

Important Notes

- Paths in @ syntax are relative to your current working directory when invoking gemini
- The CLI will include file contents directly in the context
- No need for --yolo flag for read-only analysis
- Gemini's context window can handle entire codebases that would overflow Claude's context
- When checking implementations, be specific about what you're looking for to get accurate results

# Chiro 웹사이트 디자인 가이드

## 회사 개요
- **회사명**: Chiro (치로 - 이룰 치 + 길 로)
- **사업 분야**: 웹디자인 회사 (홈페이지 리모델링 전문)
- **타겟**: 중소기업
- **핵심 철학**: 브랜드의 시각적 현대화 (홈페이지 중심)
- **목표**: "그 어떤 홈페이지보다 깔끔하고 멋있게"

## 컬러 팔레트
- **메인 컬러**: 진한 포레스트 그린 (#1DB954 계열)
- **서브 컬러**: 다크 그레이 (#121212)
- **포인트 컬러**: 라이트 그린 (#1ed760)
- **텍스트 컬러**: 화이트/라이트 그레이
- **배경**: 다크 톤 베이스 (진한 초록의 시크한 느낌)

## 디자인 철학
- **Spotify 스타일의 진한 초록** 컨셉
- **전문적이면서도 친근한** 접근성 (중소기업 사장님들 어깨뽕)
- **극도의 미니멀리즘** + 강력한 임팩트 요소
- **절제된 느낌**의 세련됨

## Chiro만의 디자인 DNA
- **Linear의 절제미** + **Spotify의 초록 시크함** + **Stripe의 신뢰감**
- **"적당히 잘 버무린" 독창성** - 트렌드 따라하기가 아닌 재해석
- **영감 참고용으로만** - 카피하지 말고 Chiro 스타일로 재창조

## 웹사이트 구조 (멀티페이지)
1. **Home** - 브랜드 소개 + 임팩트
2. **Portfolio** - 실제 작업물 + 목업 (지속 업데이트)
3. **Process** - 작업 방식/단계  
4. **About** - 회사 철학
5. **Contact** - 견적 문의

### Home Page 섹션
- **Hero Section**: "낡은 홈페이지를 현대적으로 바꿔드립니다"
- **Why Chiro**: 홈페이지 리모델링의 필요성
- **Our Impact**: 수치로 보는 효과
- **Preview**: 포트폴리오 미리보기

## 포트폴리오 페이지 기능
- **필터링 기능**: 업종별 분류 (제조업/서비스업/카페 등)
- **Before/After 슬라이더**: 마우스 드래그로 변화 확인
- **Live Demo 버튼**: 실제 사이트 새창 보기
- **Case Study**: 클릭시 상세 프로세스

## 핵심 레퍼런스 (영감용)
- **Linear** - 극도로 미니멀하면서도 "breathtakingly fast" 느낌
- **Spotify** - 진한 포레스트 그린의 시크한 활용
- **Stripe** - 다크 + 포인트 컬러로 전문성과 신뢰감
- **Will Ventures** - 미니멀 다크 + 전략적 컬러 포인트

## 현재 작업물
- **실제 작업물**: 2개 (제조업체 포함)
- **향후 계획**: 목업 추가 제작으로 포트폴리오 확장

## 타겟 사용자 고려사항
- **중소기업 사장님들**: 전문적이면서도 접근 가능한 디자인
- **멀티페이지 선호**: 이곳저곳 둘러보는 경험 제공
- **신뢰감 중시**: 안정감과 성장을 상징하는 초록 컬러

## 실행 방침
1. **개발하면서 디테일 결정** - 완벽한 계획보다는 빠른 실행
2. **"궁극의 페이지"** - 기존 것들보다 더 깔끔하고 멋있게
3. **큰 틀 잡고 → 코딩하면서 디테일 개선**

## 개발 환경
- **개발 도구**: Claude Code 사용 예정
- **접근법**: 영감받되 Chiro만의 독창적 스타일로 재해석

---
*Chiro - 홈페이지 리모델링의 새로운 기준을 만들어갑니다.*