// Grace Speech Common JavaScript

// Contact Form 처리
function handleContactForm() {
    const form = document.getElementById('mainContactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // 필수 필드 검증
            if (!validateContactForm(data)) {
                return;
            }
            
            // 로딩 상태
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // 서버 전송 시뮬레이션
            setTimeout(() => {
                // 성공 처리
                showSuccessMessage();
                form.reset();
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function validateContactForm(data) {
    // 이름 검증
    if (!data.name || data.name.trim().length < 2) {
        showErrorMessage('이름을 정확히 입력해주세요.');
        return false;
    }
    
    // 전화번호 검증
    const phoneRegex = /^[0-9-+\s()]{10,}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
        showErrorMessage('올바른 전화번호를 입력해주세요.');
        return false;
    }
    
    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showErrorMessage('올바른 이메일 주소를 입력해주세요.');
        return false;
    }
    
    // 개인정보 동의 검증
    if (!data.privacy) {
        showErrorMessage('개인정보 처리방침에 동의해주세요.');
        return false;
    }
    
    return true;
}

function showSuccessMessage() {
    // 성공 모달 또는 알림 표시
    const successHTML = `
        <div class="success-modal" id="successModal">
            <div class="success-content">
                <div class="success-icon">✅</div>
                <h3>문의가 성공적으로 접수되었습니다!</h3>
                <p>24시간 내에 담당자가 연락드리겠습니다.</p>
                <button onclick="closeSuccessModal()" class="success-btn">확인</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
    
    // 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }
        .success-content {
            background: var(--primary-deep-green);
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            max-width: 400px;
            border: 1px solid var(--accent-brown);
        }
        .success-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        .success-content h3 {
            color: var(--accent-brown);
            margin-bottom: 1rem;
        }
        .success-content p {
            color: var(--text-light);
            margin-bottom: 2rem;
        }
        .success-btn {
            background: var(--accent-brown);
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-family: var(--font-primary);
        }
    `;
    document.head.appendChild(style);
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.remove();
    }
}

function showErrorMessage(message) {
    // 간단한 에러 알림
    alert(message);
}

// 스크롤 애니메이션
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 애니메이션할 요소들
    const animateElements = document.querySelectorAll('.contact-method, .quick-option, .value-card, .timeline-item');
    animateElements.forEach(el => observer.observe(el));
}

// 스크롤 진행률 바
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.progress-bar');
    if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
}

// 헤더 스크롤 효과
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(6, 52, 46, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(6, 52, 46, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // 스크롤 방향에 따른 헤더 숨김/표시 (모바일에서만)
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

// 부드러운 스크롤
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// FAQ 아코디언 (FAQ 페이지용)
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');
                
                // 다른 아이템들 닫기
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                });
                
                // 현재 아이템 토글
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
}

// Process 타임라인 애니메이션
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });
}

// 키보드 접근성
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // 열린 모달 닫기
            const modals = document.querySelectorAll('.success-modal, .error-modal');
            modals.forEach(modal => modal.remove());
        }
        
        // 빠른 액세스 키 (Ctrl/Cmd + 키)
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'h':
                    e.preventDefault();
                    window.location.href = '../index.html';
                    break;
                case '/':
                    e.preventDefault();
                    const searchInput = document.querySelector('input[type="search"], input[name="search"]');
                    if (searchInput) searchInput.focus();
                    break;
            }
        }
    });
}

// 폼 자동 저장 (임시)
function setupFormAutoSave() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // 페이지 로드시 저장된 값 복원
            const savedValue = localStorage.getItem(`form_${input.name}`);
            if (savedValue && input.type !== 'checkbox' && input.type !== 'radio') {
                input.value = savedValue;
            }
            
            // 입력시 자동 저장
            input.addEventListener('input', function() {
                if (this.name && this.type !== 'password') {
                    localStorage.setItem(`form_${this.name}`, this.value);
                }
            });
        });
        
        // 폼 제출시 저장된 데이터 삭제
        form.addEventListener('submit', function() {
            inputs.forEach(input => {
                if (input.name) {
                    localStorage.removeItem(`form_${input.name}`);
                }
            });
        });
    });
}

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 기본 기능들 초기화
    handleContactForm();
    setupScrollAnimations();
    handleHeaderScroll();
    setupFAQAccordion();
    animateTimeline();
    setupKeyboardNavigation();
    setupFormAutoSave();
    
    // 스크롤 이벤트 (디바운싱 적용)
    const debouncedScrollProgress = debounce(updateScrollProgress, 10);
    window.addEventListener('scroll', debouncedScrollProgress);
    
    // 페이지 로드 애니메이션
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 윈도우 리사이즈 처리
window.addEventListener('resize', debounce(function() {
    // 모바일-데스크톱 전환시 레이아웃 재조정
    const header = document.querySelector('.header');
    if (header && window.innerWidth > 768) {
        header.style.transform = 'translateY(0)';
    }
}, 250));

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('JavaScript 에러:', e.error);
    // 프로덕션에서는 에러 로깅 서비스로 전송
});

// 성능 모니터링
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('페이지 로드 시간:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}