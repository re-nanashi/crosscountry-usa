export function generateHTMLCode(): string {
  const sourceCode: string = `
        <div class="c-loader__title">
          <div class="c-loader__state c-loader__state--progress">
            Now Loading
          </div>
          <div class="c-loader__state c-loader__state--complete">Complete</div>
        </div>
        <div class="c-loader__holder">
          <span class="c-loader__progress"></span>
          <span
            class="c-loader__progress-helper c-loader__progress-helper--left"
          ></span>
          <span
            class="c-loader__progress-helper c-loader__progress-helper--right"
          ></span>
          <svg
            class="c-loader__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 237 22"
          >
            <path
              d="M235.4 8.5h-1.6V5h-4V1H5.8v4h-3v3.5h-2v6h2V17h3v4h224v-4h4v-2.5h1.6v-6zm-3.6 6.5h-4v4H7.8v-4h-3V7h3V3h220v4h4v8z"
              id="Layer_7"
            />
          </svg>
        </div>
  `;

  return sourceCode;
}
