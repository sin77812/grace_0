// Grace Speech Personal JavaScript

// 레벨 테스트 모달 관리
function openLevelTest() {
    const modal = document.getElementById('levelTestModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeLevelTest() {
    const modal = document.getElementById('levelTestModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// 과정 추천 시스템
function openCourseRecommendation() {
    // 추천 시스템 모달 생성 및 표시
    createRecommendationModal();
}

function createRecommendationModal() {
    // 기존 모달이 있으면 제거
    const existingModal = document.getElementById('courseRecommendationModal');
    if (existingModal) {
        existingModal.remove();
    }

    // 추천 퀴즈 데이터
    const quizData = [
        {
            question: "현재 스피치 경험은 어느 정도인가요?",
            options: [
                { text: "완전 초보자입니다", value: "beginner", points: { consulting: 3, digital: 2, instructor: 1 } },
                { text: "기본적인 발표는 가능합니다", value: "basic", points: { consulting: 2, digital: 3, instructor: 2 } },
                { text: "어느 정도 자신 있게 할 수 있습니다", value: "intermediate", points: { consulting: 1, digital: 2, instructor: 3 } },
                { text: "전문적인 수준입니다", value: "advanced", points: { consulting: 1, digital: 1, instructor: 3 } }
            ]
        },
        {
            question: "주요 목적이 무엇인가요?",
            options: [
                { text: "면접이나 취업 준비", value: "interview", points: { consulting: 3, digital: 2, instructor: 1 } },
                { text: "회사에서의 발표 향상", value: "presentation", points: { consulting: 3, digital: 2, instructor: 1 } },
                { text: "전반적인 자신감 향상", value: "confidence", points: { consulting: 2, digital: 3, instructor: 2 } },
                { text: "강사나 강연자가 되고 싶습니다", value: "instructor", points: { consulting: 1, digital: 1, instructor: 3 } }
            ]
        },
        {
            question: "선호하는 학습 방식은?",
            options: [
                { text: "1:1 개인 집중 지도", value: "personal", points: { consulting: 3, digital: 1, instructor: 2 } },
                { text: "체계적인 장기 과정", value: "systematic", points: { consulting: 2, digital: 1, instructor: 3 } },
                { text: "자율적인 온라인 학습", value: "online", points: { consulting: 1, digital: 3, instructor: 1 } },
                { text: "실전 중심의 실습", value: "practical", points: { consulting: 2, digital: 1, instructor: 3 } }
            ]
        },
        {
            question: "투자 가능한 시간은?",
            options: [
                { text: "단기간 집중 (4-8주)", value: "short", points: { consulting: 3, digital: 2, instructor: 1 } },
                { text: "중기간 체계적 (3-6개월)", value: "medium", points: { consulting: 2, digital: 1, instructor: 3 } },
                { text: "장기간 여유롭게 (6개월+)", value: "long", points: { consulting: 1, digital: 3, instructor: 3 } },
                { text: "시간이 매우 제한적", value: "limited", points: { consulting: 1, digital: 3, instructor: 1 } }
            ]
        }
    ];

    // 모달 HTML 생성
    const modalHTML = `
        <div class="course-recommendation-modal" id="courseRecommendationModal">
            <div class="recommendation-content">
                <div class="modal-header">
                    <h3>맞춤 과정 추천</h3>
                    <button class="modal-close" onclick="closeRecommendation()">×</button>
                </div>
                <div class="recommendation-quiz" id="recommendationQuiz">
                    ${quizData.map((quiz, index) => `
                        <div class="quiz-question ${index === 0 ? 'active' : ''}" data-question="${index}">
                            <h4>${quiz.question}</h4>
                            <div class="quiz-options">
                                ${quiz.options.map((option, optionIndex) => `
                                    <div class="quiz-option" data-value="${option.value}" data-points='${JSON.stringify(option.points)}'>
                                        ${option.text}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                    <div class="quiz-navigation">
                        <button class="quiz-btn" id="prevBtn" onclick="previousQuestion()" disabled>이전</button>
                        <button class="quiz-btn" id="nextBtn" onclick="nextQuestion()" disabled>다음</button>
                    </div>
                </div>
                <div class="recommendation-result" id="recommendationResult">
                    <h3>추천 과정</h3>
                    <div class="recommended-course" id="recommendedCourse">
                        <!-- 결과가 여기에 표시됩니다 -->
                    </div>
                    <button class="quiz-btn" onclick="restartQuiz()">다시 진단</button>
                    <button class="quiz-btn" onclick="closeRecommendation()">닫기</button>
                </div>
            </div>
        </div>
    `;

    // 모달을 body에 추가
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 모달 표시
    const modal = document.getElementById('courseRecommendationModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // 퀴즈 초기화
    initializeQuiz();
}

function closeRecommendation() {
    const modal = document.getElementById('courseRecommendationModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// 퀴즈 시스템 관리
let currentQuestion = 0;
let answers = [];
let scores = { consulting: 0, digital: 0, instructor: 0 };

function initializeQuiz() {
    currentQuestion = 0;
    answers = [];
    scores = { consulting: 0, digital: 0, instructor: 0 };
    
    // 옵션 클릭 이벤트 추가
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            // 같은 질문의 다른 옵션들 선택 해제
            this.parentNode.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // 현재 옵션 선택
            this.classList.add('selected');
            
            // 답변 저장
            const questionIndex = parseInt(this.closest('.quiz-question').dataset.question);
            const value = this.dataset.value;
            const points = JSON.parse(this.dataset.points);
            
            answers[questionIndex] = { value, points };
            
            // 다음 버튼 활성화
            document.getElementById('nextBtn').disabled = false;
        });
    });
}

function nextQuestion() {
    const questions = document.querySelectorAll('.quiz-question');
    
    if (currentQuestion < questions.length - 1) {
        // 현재 점수 업데이트
        if (answers[currentQuestion]) {
            const points = answers[currentQuestion].points;
            Object.keys(points).forEach(course => {
                scores[course] += points[course];
            });
        }
        
        // 다음 질문으로 이동
        questions[currentQuestion].classList.remove('active');
        currentQuestion++;
        questions[currentQuestion].classList.add('active');
        
        // 버튼 상태 업데이트
        document.getElementById('prevBtn').disabled = false;
        document.getElementById('nextBtn').disabled = true;
        
        // 마지막 질문인지 확인
        if (currentQuestion === questions.length - 1) {
            document.getElementById('nextBtn').textContent = '결과 보기';
        }
    } else {
        // 마지막 답변 점수 추가
        if (answers[currentQuestion]) {
            const points = answers[currentQuestion].points;
            Object.keys(points).forEach(course => {
                scores[course] += points[course];
            });
        }
        
        // 결과 표시
        showRecommendationResult();
    }
}

function previousQuestion() {
    const questions = document.querySelectorAll('.quiz-question');
    
    if (currentQuestion > 0) {
        questions[currentQuestion].classList.remove('active');
        currentQuestion--;
        questions[currentQuestion].classList.add('active');
        
        // 버튼 상태 업데이트
        document.getElementById('nextBtn').disabled = false;
        document.getElementById('nextBtn').textContent = currentQuestion === questions.length - 1 ? '결과 보기' : '다음';
        
        if (currentQuestion === 0) {
            document.getElementById('prevBtn').disabled = true;
        }
    }
}

function showRecommendationResult() {
    // 최고 점수 과정 찾기
    const maxScore = Math.max(...Object.values(scores));
    const recommendedCourse = Object.keys(scores).find(course => scores[course] === maxScore);
    
    // 과정 정보
    const courseInfo = {
        consulting: {
            title: "1:1 개인 컨설팅",
            description: "개인 맞춤형 집중 코칭으로 단기간에 확실한 성과를 얻을 수 있는 과정입니다.",
            features: ["완전 개인 맞춤", "4-8주 집중 과정", "실시간 피드백", "목표 달성 보장"],
            price: "80-150만원",
            link: "consulting.html"
        },
        digital: {
            title: "디지털 콘텐츠",
            description: "언제 어디서나 자율적으로 학습할 수 있는 온라인 과정입니다.",
            features: ["24시간 접근 가능", "단계별 학습", "반복 학습", "합리적 가격"],
            price: "9.9-39.9만원",
            link: "digital.html"
        },
        instructor: {
            title: "강사양성과정",
            description: "전문 강사로 성장하여 새로운 커리어를 시작할 수 있는 종합 과정입니다.",
            features: ["6개월 체계 과정", "실무 중심 교육", "창업 지원", "수익 창출"],
            price: "500만원 (분할 가능)",
            link: "instructor.html"
        }
    };
    
    const info = courseInfo[recommendedCourse];
    
    // 결과 HTML 생성
    const resultHTML = `
        <h4>${info.title}</h4>
        <p>${info.description}</p>
        <ul style="text-align: left; margin: 15px 0; color: var(--text-light);">
            ${info.features.map(feature => `<li>• ${feature}</li>`).join('')}
        </ul>
        <p style="color: var(--primary-deep-green); font-weight: bold;">투자비용: ${info.price}</p>
        <a href="${info.link}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: var(--primary-deep-green); color: white; text-decoration: none; border-radius: 8px;">자세히 보기</a>
    `;
    
    document.getElementById('recommendedCourse').innerHTML = resultHTML;
    
    // 퀴즈 숨기고 결과 표시
    document.getElementById('recommendationQuiz').style.display = 'none';
    document.getElementById('recommendationResult').classList.add('show');
}

function restartQuiz() {
    document.getElementById('recommendationQuiz').style.display = 'block';
    document.getElementById('recommendationResult').classList.remove('show');
    
    // 퀴즈 초기화
    currentQuestion = 0;
    answers = [];
    scores = { consulting: 0, digital: 0, instructor: 0 };
    
    // 모든 질문 숨기고 첫 번째만 표시
    document.querySelectorAll('.quiz-question').forEach((q, index) => {
        q.classList.toggle('active', index === 0);
    });
    
    // 모든 선택 해제
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 버튼 초기화
    document.getElementById('prevBtn').disabled = true;
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('nextBtn').textContent = '다음';
}

// 성공 사례 더보기 기능
function loadMoreStories() {
    // 추가 성공 사례 데이터
    const additionalStories = [
        {
            title: "결혼식 주례 완벽 소화",
            type: "일반인 • 정○○님",
            content: "친구 결혼식 주례를 맡게 되어 급하게 수강했는데, 완벽하게 소화해서 모든 하객들에게 감동을 주었습니다.",
            badge: "특별 목적",
            badgeClass: "special"
        },
        {
            title: "유튜브 채널 런칭 성공",
            type: "크리에이터 • 한○○님",
            content: "카메라 앞에서 떨지 않고 자연스럽게 이야기할 수 있게 되어 구독자 10만 달성했습니다.",
            badge: "콘텐츠 제작",
            badgeClass: "content"
        }
    ];
    
    // 스토리 추가 로직 (실제로는 서버에서 데이터를 가져올 것)
    console.log("추가 스토리 로드:", additionalStories);
}

// 개인용 페이지 특화 기능들
function setupPersonalFeatures() {
    // 성공률 애니메이션
    animateSuccessRate();
    
    // 스토리 카드 인터랙션 강화
    enhanceStoryCards();
    
    // 개인용 키보드 단축키
    setupPersonalKeyboardShortcuts();
}

function animateSuccessRate() {
    const successElements = document.querySelectorAll('.result-number');
    
    successElements.forEach(element => {
        const finalValue = element.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        
        if (!isNaN(numericValue)) {
            let current = 0;
            const increment = numericValue / 60; // 60 프레임
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    element.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(current);
                    element.textContent = isPercentage ? displayValue + '%' : 
                                        finalValue.includes('+') ? displayValue + '+' :
                                        finalValue.includes('주') ? displayValue + '주' : displayValue;
                }
            }, 16); // 60fps
        }
    });
}

function enhanceStoryCards() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        // 호버시 추가 정보 표시
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
        
        // 클릭시 상세 정보 (향후 구현)
        card.addEventListener('click', function() {
            console.log('스토리 상세 보기:', this.querySelector('h3').textContent);
        });
    });
}

function setupPersonalKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            switch(e.key) {
                case 't':
                    e.preventDefault();
                    openLevelTest();
                    break;
                case 'r':
                    e.preventDefault();
                    openCourseRecommendation();
                    break;
                case 'c':
                    e.preventDefault();
                    openQuickContact();
                    break;
            }
        }
    });
}

// 폼 제출 처리 (개인용)
function handlePersonalForms() {
    // 레벨 테스트 폼
    const levelTestForm = document.querySelector('.test-form');
    if (levelTestForm) {
        levelTestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.textContent = '처리 중...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('레벨 테스트 신청이 완료되었습니다.\n2-3일 내에 담당자가 연락드려 테스트 일정을 안내해드리겠습니다.');
                closeLevelTest();
                this.reset();
                submitBtn.textContent = '레벨테스트 신청';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // 개인 상담 폼
    const personalContactForm = document.querySelector('#quickContactModal .contact-form');
    if (personalContactForm) {
        personalContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('상담 신청이 완료되었습니다.\n24시간 내에 개인 맞춤 상담을 위해 연락드리겠습니다.');
                closeQuickContact();
                this.reset();
                submitBtn.textContent = '상담 신청';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// 페이지 로드시 개인용 기능 초기화
document.addEventListener('DOMContentLoaded', function() {
    setupPersonalFeatures();
    handlePersonalForms();
    
    // 개인용 페이지 특별 애니메이션
    setTimeout(() => {
        document.querySelectorAll('.course-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// 모달 외부 클릭시 닫기 (개인용)
document.addEventListener('click', function(e) {
    const levelTestModal = document.getElementById('levelTestModal');
    const recommendationModal = document.getElementById('courseRecommendationModal');
    
    if (levelTestModal && e.target === levelTestModal) {
        closeLevelTest();
    }
    
    if (recommendationModal && e.target === recommendationModal) {
        closeRecommendation();
    }
});