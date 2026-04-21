/** images */
declare module '*.avif';
declare module '*.gif';
declare module '*.apng';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.jfif';
declare module '*.pjpeg';
declare module '*.pjp';
declare module '*.svg';
declare module '*.webp';

/** other */
declare module '*.txt';

/** css */
declare module "*.css";

declare module 'circular-dependency-plugin' {
  import type { WebpackPluginInstance } from 'webpack';

  const CircularDependencyPlugin: new (options: {
    exclude?: RegExp
    include?: RegExp
    failOnError?: boolean
    allowAsyncCycles?: boolean
    onDetected?: boolean
    cwd?: string
  }) => WebpackPluginInstance;
  export default CircularDependencyPlugin;
}
