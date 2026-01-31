/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 *
 * RENDER TIMEOUT: If you get "Timeout (30000ms) exceeded" when rendering
 * (e.g. "Extracting audio for frame 0"), increase the timeout:
 * - Studio: Render → Advanced → set "Delay render timeout" to e.g. 120000 (2 min)
 * - CLI: use --timeout=120000 (or use `npm run render` which sets 180000)
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);
