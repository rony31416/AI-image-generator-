# AI Image Generator

The AI Image Generator project is a React application built using Vite, Tailwind CSS, and a modular component-based structure for easy scalability. This single-page application provides a user-friendly interface for generating AI-driven images by integrating with models like Hugging Face in future iterations.

## Key Features

- **Dark/Light Mode Toggle**: A seamless theme-switching feature, allowing users to toggle between dark and light themes for personalized usability.
- **Prompt Input Box**: A text input for users to describe their desired image, serving as the core of the generation process.
- **Dropdown Options**:
  - **Model Selection**: Users can choose from various pre-defined AI models, such as:
    - FLUX.1-dev
    - FLUX.1-schnell
    - Stable Diffusion XL
    - Stable Diffusion v1.5
    - Openjourney
  - **Number of Images**: Dropdown to select the number of images to generate (e.g., 1, 2, 3, 4+).
  - **Aspect Ratio**: Allows selection of the aspect ratio for images, such as 1:1, 3:4, 9:16, etc.
- **Generate Button**: A magical button with an engaging icon that initiates the generation process.
- **Dynamic Image Display Grid**: Displays the generated images in a responsive, visually appealing grid format.

## Technical Implementation

The project is structured into reusable components to enhance maintainability and modularity. It includes placeholders for integrating Hugging Face's models, making it adaptable for future AI image generation functionalities.

The design uses Tailwind CSS for responsive and modern styling, while Vite ensures faster development and optimized performance. Each feature is compartmentalized into individual .jsx files, enabling scalable code management.

## How to Install

1. Clone the repository:
   ```
   git clone https://github.com/rony31416/AI-image-generator-.git
   ```

2. Go to the file directory and install the React modules:
   ```
   npm install
   ```

3. Go to Hugging Face and create an API token, then save it to your `.env` file at the root of the project:
   ```
   VITE_HUGGING_FACE_API_KEY=your_api_key_here
   ```

4. Run the application:
   ```
   npm run dev
   ```
