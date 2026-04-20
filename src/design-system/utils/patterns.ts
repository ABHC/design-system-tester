export type PatternPreset =
    | "none"
    | "scallops"
    | "grid"
    | "sunburst"
    | "lozenge"
    | "sunrise"
    | "atoms"
    | "waves"
    | "diamonds"
    | "shippo"
    | "kumi_kikko";

export const PATTERN_PRESETS: Record<Exclude<PatternPreset, "none">, string> = {
    scallops:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0" +
        " 0 40 40'%3E%3Cg fill='none' stroke='white' stroke-width='0.4' stroke-linecap='square'%3E" +
        "%3Cpath d='M0.1 40 A9.9 9.9 0 0 1 10 30.1 9.9 9.9 0 0 1 19.9 40'/%3E" +
        "%3Cpath d='M20.1 40 A9.9 9.9 0 0 1 30 30.1 9.9 9.9 0 0 1 39.9 40'/%3E" +
        "%3Cpath d='M10.1 30 A9.9 9.9 0 0 1 20 20.1 9.9 9.9 0 0 1 29.9 30'/%3E" +
        "%3Cpath d='M-9.9 30 A9.9 9.9 0 0 1 0 20.1 9.9 9.9 0 0 1 9.9 30'/%3E" +
        "%3Cpath d='M30.1 30 A9.9 9.9 0 0 1 40 20.1 9.9 9.9 0 0 1 49.9 30'/%3E" +
        "%3Cpath d='M0.1 20 A9.9 9.9 0 0 1 10 10.1 9.9 9.9 0 0 1 19.9 20'/%3E" +
        "%3Cpath d='M20.1 20 A9.9 9.9 0 0 1 30 10.1 9.9 9.9 0 0 1 39.9 20'/%3E" +
        "%3Cpath d='M10.1 10 A9.9 9.9 0 0 1 20 0.1 9.9 9.9 0 0 1 29.9 10'/%3E" +
        "%3Cpath d='M-9.9 10 A9.9 9.9 0 0 1 0 0.1 9.9 9.9 0 0 1 9.9 10'/%3E" +
        "%3Cpath d='M30.1 10 A9.9 9.9 0 0 1 40 0.1 9.9 9.9 0 0 1 49.9 10'/%3E%3C/g%3E%3C/svg" +
        "%3E\")",
    grid:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E" +
        "%3Cpath d='M60 0H0V60' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg" +
        "%3E\")",
    sunburst:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0" +
        " 0 60 60'%3E%3Cg fill='none' stroke='white' stroke-width='0.4'%3E%3Ccircle cx='30' cy='30' r='6'/" +
        "%3E%3Cpath d='M30 30 L30 0 M30 30 L60 30 M30 30 L30 60 M30 30 L0 30 M30 30 L51 9 M30 30 L51 51 M30 3" +
        "0 L9 51 M30 30 L9 9'/%3E%3C/g%3E%3C/svg%3E\")",
    lozenge:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='41' height='41' viewBox='0" +
        " 0 41 41'%3E%3Cg fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='miter'%3E" +
        "%3Crect x='5.8' y='5.8' width='29.4' height='29.4' stroke-width='1' transform='rotate(45,20.5,20.5)'" +
        "/%3E%3Crect x='9.5' y='9.5' width='22' height='22' stroke-width='0.7' transform='rotate(45,20.5,20.5" +
        ")'/%3E%3Crect x='16.5' y='16.5' width='8' height='8' rx='0.8' fill='white' stroke='none' transform='" +
        "rotate(45,20.5,20.5)'/%3E%3C/g%3E%3C/svg%3E\")",
    sunrise:
        "url(\"data:image/svg+xml,%3Csvg width='44.365002mm' height='44.365002mm' viewBox='0 0 44.365002 44.3" +
        "65002' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs /%3E%3Cg%3E" +
        "%3Cg transform='translate(-104.99974,-126.40049)'%3E" +
        "%3Cg transform='translate(-38.419985,64.284469)'%3E" +
        "%3Cg transform='rotate(45,-54.394401,374.83056)' style=''%3E" +
        "%3Crect style='fill:none;stroke:white;stroke-width:1;stroke-linecap:round;stroke-linejoin:miter' wid" +
        "th='28.95656' height='28.95656' x='-134.49265' y='14.980528' ry='0' rx='0' /%3E%3C/g%3E" +
        "%3Cpath style='fill:white;fill-opacity:1;stroke-width:2.51868;stroke-linecap:square;stroke-linejoin:" +
        "miter' d='m 134.9347,96.912737 a 12,12 0 0 1 16.97056,-1e-6 l -8.48528,8.485284 z' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 143.40906,64.045386 -0.0218,40.521784' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 130.46159,76.817676 12.86546,27.641664' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 136.00145,71.109594 7.35482,33.404786' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 150.78985,71.114608 143.43503,104.5194' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 156.33473,76.843496 143.46927,104.48516' /%3E%3C/g%3E" +
        "%3Cg transform='translate(5.9445016,64.284469)'%3E" +
        "%3Cg transform='rotate(45,-54.394401,374.83056)' style=''%3E" +
        "%3Crect style='fill:none;stroke:white;stroke-width:1;stroke-linecap:round;stroke-linejoin:miter' wid" +
        "th='28.95656' height='28.95656' x='-134.49265' y='14.980528' ry='0' rx='0' /%3E%3C/g%3E" +
        "%3Cpath style='fill:white;fill-opacity:1;stroke-width:2.51868;stroke-linecap:square;stroke-linejoin:" +
        "miter' d='m 134.9347,96.912737 a 12,12 0 0 1 16.97056,-1e-6 l -8.48528,8.485284 z' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 143.40906,64.045386 -0.0218,40.521784' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 130.46159,76.817676 12.86546,27.641664' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 136.00145,71.109594 7.35482,33.404786' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 150.78985,71.114608 143.43503,104.5194' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 156.33473,76.843496 143.46927,104.48516' /%3E%3C/g%3E" +
        "%3Cg transform='translate(-16.237742,42.184956)'%3E" +
        "%3Cg transform='rotate(45,-54.394401,374.83056)' style=''%3E" +
        "%3Crect style='fill:none;stroke:white;stroke-width:1;stroke-linecap:round;stroke-linejoin:miter' wid" +
        "th='28.95656' height='28.95656' x='-134.49265' y='14.980528' ry='0' rx='0' /%3E%3C/g%3E" +
        "%3Cpath style='fill:white;fill-opacity:1;stroke-width:2.51868;stroke-linecap:square;stroke-linejoin:" +
        "miter' d='m 134.9347,96.912737 a 12,12 0 0 1 16.97056,-1e-6 l -8.48528,8.485284 z' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 143.40906,64.045386 -0.0218,40.521784' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 130.46159,76.817676 12.86546,27.641664' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 136.00145,71.109594 7.35482,33.404786' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 150.78985,71.114608 143.43503,104.5194' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 156.33473,76.843496 143.46927,104.48516' /%3E%3C/g%3E" +
        "%3Cg transform='translate(-16.237742,86.549956)'%3E" +
        "%3Cg transform='rotate(45,-54.394401,374.83056)' style=''%3E" +
        "%3Crect style='fill:none;stroke:white;stroke-width:1;stroke-linecap:round;stroke-linejoin:miter' wid" +
        "th='28.95656' height='28.95656' x='-134.49265' y='14.980528' ry='0' rx='0' /%3E%3C/g%3E" +
        "%3Cpath style='fill:white;fill-opacity:1;stroke-width:2.51868;stroke-linecap:square;stroke-linejoin:" +
        "miter' d='m 134.9347,96.912737 a 12,12 0 0 1 16.97056,-1e-6 l -8.48528,8.485284 z' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 143.40906,64.045386 -0.0218,40.521784' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 130.46159,76.817676 12.86546,27.641664' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 136.00145,71.109594 7.35482,33.404786' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 150.78985,71.114608 143.43503,104.5194' /%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 156.33473,76.843496 143.46927,104.48516' /%3E%3C/g%3E%3C/g%3E%3C/g%3E" +
        "%3C/svg%3E\")",
    atoms:
        "url(\"data:image/svg+xml,%3Csvg width='71.129997mm' height='121.7mm' viewBox='0 0 71.129998 121.7' x" +
        "mlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cg%3E%3Cg transform='translate(-26.519668,-100.57083)'" +
        "%3E%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;" +
        "stroke-linejoin:miter' d='m 62.076564,120.15563 -0.0218,40.52179'/%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 78.766534,131.3813 28.138771,160.58608'/%3E" +
        "%3Cg transform='translate(7.923231,82.364596)'%3E%3Cpath style='fill:white;fill-opacity:1;stroke:whi" +
        "te;stroke-width:0.799999;stroke-linecap:square' d='m -63.838626,-37.040944 a 20,20 0 0 1 19.392386,1" +
        "e-6 l -9.696193,17.492393 z' transform='scale(-1)'/%3E" +
        "%3Cpath style='fill:none;stroke:white;stroke-width:1;stroke-linecap:square' d='m 53.672137,19.696201" +
        " 34.426989,57.92355 -67.37676,0.852871 z' transform='rotate(0.7218107,53.113257,57.396845)'/%3E" +
        "%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:square' d" +
        "='M 68.211792,2.8056955 A 20,20 0 0 1 87.907985,2.6338097 L 78.211792,20.126204 Z' transform='rotate" +
        "(61)'/%3E%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:" +
        "square' d='M 15.699297,97.540744 A 20,20 0 0 1 35.39549,97.368858 l -9.696193,17.492392 z' transform" +
        "='matrix(-0.48480962,0.87461971,0.87461971,0.48480962,0,0)'/%3E%3C/g%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 45.381004,131.3813 96.00877,160.58608'/%3E" +
        "%3Ccircle style='fill:white;fill-opacity:1;stroke:white;stroke-width:1;stroke-linecap:square' cx='35" +
        ".545998' cy='229.09346' r='3' transform='translate(26.519668,-88.106253)'/%3E%3C/g%3E" +
        "%3Cg transform='rotate(180,66.592437,80.71378)'%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 62.076564,120.15563 -0.0218,40.52179'/%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 78.766534,131.3813 28.138771,160.58608'/%3E" +
        "%3Cg transform='translate(7.923231,82.364596)'%3E%3Cpath style='fill:white;fill-opacity:1;stroke:whi" +
        "te;stroke-width:0.799999;stroke-linecap:square' d='m -63.838626,-37.040944 a 20,20 0 0 1 19.392386,1" +
        "e-6 l -9.696193,17.492393 z' transform='scale(-1)'/%3E" +
        "%3Cpath style='fill:none;stroke:white;stroke-width:1;stroke-linecap:square' d='m 53.672137,19.696201" +
        " 34.426989,57.92355 -67.37676,0.852871 z' transform='rotate(0.7218107,53.113257,57.396845)'/%3E" +
        "%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:square' d" +
        "='M 68.211792,2.8056955 A 20,20 0 0 1 87.907985,2.6338097 L 78.211792,20.126204 Z' transform='rotate" +
        "(61)'/%3E%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:" +
        "square' d='M 15.699297,97.540744 A 20,20 0 0 1 35.39549,97.368858 l -9.696193,17.492392 z' transform" +
        "='matrix(-0.48480962,0.87461971,0.87461971,0.48480962,0,0)'/%3E%3C/g%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 45.381004,131.3813 96.00877,160.58608'/%3E" +
        "%3Ccircle style='fill:white;fill-opacity:1;stroke:white;stroke-width:1;stroke-linecap:square' cx='35" +
        ".545998' cy='229.09346' r='3' transform='translate(26.519668,-88.106253)'/%3E%3C/g%3E" +
        "%3Cg transform='rotate(180,31.035438,80.71378)'%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 62.076564,120.15563 -0.0218,40.52179'/%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 78.766534,131.3813 28.138771,160.58608'/%3E" +
        "%3Cg transform='translate(7.923231,82.364596)'%3E%3Cpath style='fill:white;fill-opacity:1;stroke:whi" +
        "te;stroke-width:0.799999;stroke-linecap:square' d='m -63.838626,-37.040944 a 20,20 0 0 1 19.392386,1" +
        "e-6 l -9.696193,17.492393 z' transform='scale(-1)'/%3E" +
        "%3Cpath style='fill:none;stroke:white;stroke-width:1;stroke-linecap:square' d='m 53.672137,19.696201" +
        " 34.426989,57.92355 -67.37676,0.852871 z' transform='rotate(0.7218107,53.113257,57.396845)'/%3E" +
        "%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:square' d" +
        "='M 68.211792,2.8056955 A 20,20 0 0 1 87.907985,2.6338097 L 78.211792,20.126204 Z' transform='rotate" +
        "(61)'/%3E%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:" +
        "square' d='M 15.699297,97.540744 A 20,20 0 0 1 35.39549,97.368858 l -9.696193,17.492392 z' transform" +
        "='matrix(-0.48480962,0.87461971,0.87461971,0.48480962,0,0)'/%3E%3C/g%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 45.381004,131.3813 96.00877,160.58608'/%3E" +
        "%3Ccircle style='fill:white;fill-opacity:1;stroke:white;stroke-width:1;stroke-linecap:square' cx='35" +
        ".545998' cy='229.09346' r='3' transform='translate(26.519668,-88.106253)'/%3E%3C/g%3E%3C/g%3E%3C/g" +
        "%3E%3Cg transform='rotate(180,35.559551,60.856865)'%3E%3Cg%3E" +
        "%3Cg transform='translate(-26.519668,-100.57083)'%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 62.076564,120.15563 -0.0218,40.52179'/%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 78.766534,131.3813 28.138771,160.58608'/%3E" +
        "%3Cg transform='translate(7.923231,82.364596)'%3E%3Cpath style='fill:white;fill-opacity:1;stroke:whi" +
        "te;stroke-width:0.799999;stroke-linecap:square' d='m -63.838626,-37.040944 a 20,20 0 0 1 19.392386,1" +
        "e-6 l -9.696193,17.492393 z' transform='scale(-1)'/%3E" +
        "%3Cpath style='fill:none;stroke:white;stroke-width:1;stroke-linecap:square' d='m 53.672137,19.696201" +
        " 34.426989,57.92355 -67.37676,0.852871 z' transform='rotate(0.7218107,53.113257,57.396845)'/%3E" +
        "%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:square' d" +
        "='M 68.211792,2.8056955 A 20,20 0 0 1 87.907985,2.6338097 L 78.211792,20.126204 Z' transform='rotate" +
        "(61)'/%3E%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:" +
        "square' d='M 15.699297,97.540744 A 20,20 0 0 1 35.39549,97.368858 l -9.696193,17.492392 z' transform" +
        "='matrix(-0.48480962,0.87461971,0.87461971,0.48480962,0,0)'/%3E%3C/g%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 45.381004,131.3813 96.00877,160.58608'/%3E" +
        "%3Ccircle style='fill:white;fill-opacity:1;stroke:white;stroke-width:1;stroke-linecap:square' cx='35" +
        ".545998' cy='229.09346' r='3' transform='translate(26.519668,-88.106253)'/%3E%3C/g%3E" +
        "%3Cg transform='rotate(180,66.592437,80.71378)'%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 62.076564,120.15563 -0.0218,40.52179'/%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 78.766534,131.3813 28.138771,160.58608'/%3E" +
        "%3Cg transform='translate(7.923231,82.364596)'%3E%3Cpath style='fill:white;fill-opacity:1;stroke:whi" +
        "te;stroke-width:0.799999;stroke-linecap:square' d='m -63.838626,-37.040944 a 20,20 0 0 1 19.392386,1" +
        "e-6 l -9.696193,17.492393 z' transform='scale(-1)'/%3E" +
        "%3Cpath style='fill:none;stroke:white;stroke-width:1;stroke-linecap:square' d='m 53.672137,19.696201" +
        " 34.426989,57.92355 -67.37676,0.852871 z' transform='rotate(0.7218107,53.113257,57.396845)'/%3E" +
        "%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:square' d" +
        "='M 68.211792,2.8056955 A 20,20 0 0 1 87.907985,2.6338097 L 78.211792,20.126204 Z' transform='rotate" +
        "(61)'/%3E%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:" +
        "square' d='M 15.699297,97.540744 A 20,20 0 0 1 35.39549,97.368858 l -9.696193,17.492392 z' transform" +
        "='matrix(-0.48480962,0.87461971,0.87461971,0.48480962,0,0)'/%3E%3C/g%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 45.381004,131.3813 96.00877,160.58608'/%3E" +
        "%3Ccircle style='fill:white;fill-opacity:1;stroke:white;stroke-width:1;stroke-linecap:square' cx='35" +
        ".545998' cy='229.09346' r='3' transform='translate(26.519668,-88.106253)'/%3E%3C/g%3E" +
        "%3Cg transform='rotate(180,31.035438,80.71378)'%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='m 62.076564,120.15563 -0.0218,40.52179'/%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 78.766534,131.3813 28.138771,160.58608'/%3E" +
        "%3Cg transform='translate(7.923231,82.364596)'%3E%3Cpath style='fill:white;fill-opacity:1;stroke:whi" +
        "te;stroke-width:0.799999;stroke-linecap:square' d='m -63.838626,-37.040944 a 20,20 0 0 1 19.392386,1" +
        "e-6 l -9.696193,17.492393 z' transform='scale(-1)'/%3E" +
        "%3Cpath style='fill:none;stroke:white;stroke-width:1;stroke-linecap:square' d='m 53.672137,19.696201" +
        " 34.426989,57.92355 -67.37676,0.852871 z' transform='rotate(0.7218107,53.113257,57.396845)'/%3E" +
        "%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:square' d" +
        "='M 68.211792,2.8056955 A 20,20 0 0 1 87.907985,2.6338097 L 78.211792,20.126204 Z' transform='rotate" +
        "(61)'/%3E%3Cpath style='fill:white;fill-opacity:1;stroke:white;stroke-width:0.799999;stroke-linecap:" +
        "square' d='M 15.699297,97.540744 A 20,20 0 0 1 35.39549,97.368858 l -9.696193,17.492392 z' transform" +
        "='matrix(-0.48480962,0.87461971,0.87461971,0.48480962,0,0)'/%3E%3C/g%3E" +
        "%3Cpath style='fill:none;fill-opacity:1;stroke:white;stroke-width:0.499999;stroke-linecap:square;str" +
        "oke-linejoin:miter' d='M 45.381004,131.3813 96.00877,160.58608'/%3E" +
        "%3Ccircle style='fill:white;fill-opacity:1;stroke:white;stroke-width:1;stroke-linecap:square' cx='35" +
        ".545998' cy='229.09346' r='3' transform='translate(26.519668,-88.106253)'/%3E%3C/g%3E%3C/g%3E%3C/g" +
        "%3E%3C/svg%3E\")",
    waves:
        "url(\"data:image/svg+xml,%3Csvg%20width=%2240.400002mm%22%20height=%2240.5mm%22%20viewBox=%220%200" +
        "%2040.400002%2040.500001%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs/%3E%3Cg%3E%3Cg" +
        "%20transform=%22translate%280.20000038,0.19999981%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22M%200.10000038,40%20A%209.8999996,9.8999996%200" +
        "%200%201%2010,30.1%209.8999996,9.8999996%200%200%201%2019.9,40%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22M%2020.1,40%20A%209.8999996,9.8999996%200%200%201" +
        "%2030,30.1%209.8999996,9.8999996%200%200%201%2039.9,40%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22M%2010.1,30%20A%209.8999996,9.8999996%200%200%201" +
        "%2020,20.1%209.8999996,9.8999996%200%200%201%2029.9,30%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22M%20-9.8999989,30%20A%209.8999996,9.8999996%200" +
        "%200%201%207.5995922e-7,20.1%209.8999996,9.8999996%200%200%201%209.9000004,30%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stro" +
        "ke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22M%2030.1,30%20A%209.8999996,9.8999996" +
        "%200%200%201%2040,20.1%209.8999996,9.8999996%200%200%201%2049.9,30%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22M%200.10000038,20%20A%209.8999996,9.8999996%200" +
        "%200%201%2010,10.1%209.8999996,9.8999996%200%200%201%2019.9,20%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22M%2020.1,20%20A%209.8999996,9.8999996%200%200%201" +
        "%2030,10.1%209.8999996,9.8999996%200%200%201%2039.9,20%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22M%2010.1,10%20A%209.8999996,9.8999996%200%200%201" +
        "%2020,0.10000038%209.8999996,9.8999996%200%200%201%2029.9,10%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22M%20-9.8999989,10%20A%209.8999996,9.8999996%200" +
        "%200%201%207.5995922e-7,0.10000038%209.8999996,9.8999996%200%200%201%209.9000004,10%22%20/%3E" +
        "%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:no" +
        "ne;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22M%2030.1,10%20A" +
        "%209.8999996,9.8999996%200%200%201%2040,0.10000038%209.8999996,9.8999996%200%200%201%2049.9,10%22" +
        "%20/%3E%3C/g%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.4;stroke-linecap:square;stro" +
        "ke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22m" +
        "%2013.200001,10.319595%20a%207,7%200%200%201%207,-6.9999997%207,7%200%200%201%207,6.9999997%22%20/" +
        "%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.4;stroke-linecap:square;stroke-dasharray" +
        ":none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2033.200001,10.319595%20a" +
        "%207,7%200%200%201%207,-6.9999997%207,7%200%200%201%207,6.9999997%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.4;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22M%20-6.7999989,10.319595%20A%207,7%200%200%201" +
        "%200.20000114,3.3195953%207,7%200%200%201%207.2000011,10.319595%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.4;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%203.2000008,20.329437%20a%207,7%200%200%201" +
        "%207.0000002,-7%207,7%200%200%201%207,7%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.4;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%203.2000008,40.816383%20a%207,7%200%200%201" +
        "%207.0000002,-7%207,7%200%200%201%207,7%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.4;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2023.200001,40.816383%20a%207,7%200%200%201" +
        "%207,-7%207,7%200%200%201%207,7%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.4;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2023.200001,20.329437%20a%207,7%200%200%201" +
        "%207,-7%207,7%200%200%201%207,7%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.4;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2013.200001,30.322227%20a%207,7%200%200%201" +
        "%207,-7%207,7%200%200%201%207,7%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.4;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%20-6.7999989,30.322227%20a%207,7%200%200%201" +
        "%207.00000004,-7%207,7%200%200%201%206.99999996,7%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.4;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2033.200001,30.322227%20a%207,7%200%200%201" +
        "%207,-7%207,7%200%200%201%207,7%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2015.200001,31.258533%20a%205,5%200%200%201" +
        "%205,-5%205,5%200%200%201%205,5%22%20/%3E%3Cpath%20style=" +
        "%22display:none;fill:white;fill-opacity:1;stroke-width:0.528247;stroke-linecap:square;stroke-dasharr" +
        "ay:none;paint-order:stroke%20fill%20markers%22%20d=%22m%2070.742945,132.13765%20c" +
        "%20-3.812826,-6.04918%20-5.482105,-7.362%20-11.846259,-12.40531%20-1.98296,-1.57141" +
        "%20-1.462791,-2.49272%20-0.286445,-6.46341%202.037327,-6.87688%209.581548,-13.572762" +
        "%2016.795904,-13.5611%206.988224,0.0113%2013.838599,3.55849%2017.282345,10.09142%201.189125,2.25582" +
        "%203.021744,5.71458%202.129154,8.49353%20-0.399733,1.24451%20-1.388654,1.39151%20-2.990132,2.53702" +
        "%20-3.661439,2.61896%20-7.63449,6.40655%20-10.047506,10.13995%20-1.902542,2.94361" +
        "%20-5.407391,13.1209%20-5.408076,13.3916%20-3.54e-4,0.14004%20-3.838444,-9.38295" +
        "%20-5.628985,-12.2237%20z%22%20transform=%22scale%280.26458333%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%205.2000008,41.777721%20a%205,5%200%200%201" +
        "%205.0000002,-5%205,5%200%200%201%205,5%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22m%2019.976041,49.047134%20a%200.16536458,0.03307291%200%200%201" +
        "%200.165364,-0.03307%200.16536458,0.03307291%200%200%201%200.165365,0.03307%22%20/%3E%3Cg" +
        "%20transform=%22translate%28-0.73958218,-1.0395824%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2011.039583,51.739582%20a%209.8999996,9.8999996" +
        "%200%200%201%209.9,-9.9%209.8999996,9.8999996%200%200%201%209.899999,9.9%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%20-8.9604166,51.739582%20a" +
        "%209.8999996,9.8999996%200%200%201%209.89999966,-9.9%209.8999996,9.8999996%200%200%201" +
        "%209.89999994,9.9%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.6;stroke-linecap" +
        ":square;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22m" +
        "%2031.039583,51.739582%20a%209.8999996,9.8999996%200%200%201%209.9,-9.9%209.8999996,9.8999996%200" +
        "%200%201%209.899999,9.9%22%20/%3E%3C/g%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2025.200001,41.794792%20a%205,5%200%200%201" +
        "%205,-5%205,5%200%200%201%205,5%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%205.2000008,21.258951%20a%205,5%200%200%201" +
        "%205.0000002,-5%205,5%200%200%201%205,5%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2025.200001,21.258951%20a%205,5%200%200%201" +
        "%205,-5%205,5%200%200%201%205,5%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%20-4.7999989,31.258533%20a%205,5%200%200%201" +
        "%205.00000004,-5%205,5%200%200%201%204.99999996,5%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2035.200001,31.258533%20a%205,5%200%200%201" +
        "%205,-5%205,5%200%200%201%205,5%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2015.200001,11.247579%20a%205,5%200%200%201" +
        "%205,-5.0000004%205,5%200%200%201%205,5.0000004%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22m%2035.200001,11.247579%20a%205,5%200%200%201" +
        "%205,-5.0000004%205,5%200%200%201%205,5.0000004%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.3;stroke-linecap:square;stroke-dasharray:none;stroke-opacit" +
        "y:1;paint-order:stroke%20fill%20markers%22%20d=%22M%20-4.7999989,11.247579%20A%205,5%200%200%201" +
        "%200.20000114,6.2475786%205,5%200%200%201%205.2000011,11.247579%22%20/%3E%3C/g%3E%3C/svg" +
        "%3E\")",
    diamonds:
        "url(\"data:image/svg+xml,%3Csvg%20width=%2279.400002mm%22%20height=%22119.4mm%22%20viewBox=%220%200" +
        "%2079.400001%20119.4%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs/%3E%3Cg%3E%3Cg" +
        "%20transform=%22rotate%280.005,912777.67,-4416399.1%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.969733;stroke-linecap:square;stroke-dasharray:none;paint-or" +
        "der:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%281.0103246,0.01909201,-0.01272872,1.5154026,371.13406,49.503668%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.63144144,0.01193229,-0.00795531,0.94710951,391.37639,83.191282%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702848,0.00485704,-0.00323821,0.38552129,411.3799,116.48144%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20386.25048,139.29643%20h%2014.29696%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20449.59361,139.31094%20h%2014.29696%22%20/%3E%3C/g%3E%3Cg%20transform=%22rotate" +
        "%280.005,912817.37,-3506442%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.969733;stroke-linecap:square;stroke-dasharray:none;paint-or" +
        "der:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%281.0103246,0.01909201,-0.01272872,1.5154026,371.13406,49.503668%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.63144144,0.01193229,-0.00795531,0.94710951,391.37639,83.191282%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702848,0.00485704,-0.00323821,0.38552129,411.3799,116.48144%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20386.25048,139.29643%20h%2014.29696%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20449.59361,139.31094%20h%2014.29696%22%20/%3E%3C/g%3E%3Cg%20transform=%22rotate" +
        "%280.005,912737.97,-5326190.4%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.969733;stroke-linecap:square;stroke-dasharray:none;paint-or" +
        "der:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%281.0103246,0.01909201,-0.01272872,1.5154026,371.13406,49.503668%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.63144144,0.01193229,-0.00795531,0.94710951,391.37639,83.191282%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702848,0.00485704,-0.00323821,0.38552129,411.3799,116.48144%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20386.25048,139.29643%20h%2014.29696%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20449.59361,139.31094%20h%2014.29696%22%20/%3E%3C/g%3E%3Cg%20transform=%22rotate" +
        "%280.005,-455422.63,-4417622.5%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.969733;stroke-linecap:square;stroke-dasharray:none;paint-or" +
        "der:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%281.0103246,0.01909201,-0.01272872,1.5154026,371.13406,49.503668%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.63144144,0.01193229,-0.00795531,0.94710951,391.37639,83.191282%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702848,0.00485704,-0.00323821,0.38552129,411.3799,116.48144%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20386.25048,139.29643%20h%2014.29696%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20449.59361,139.31094%20h%2014.29696%22%20/%3E%3C/g%3E%3Cg%20transform=%22rotate" +
        "%280.005,2280978,-4415008.7%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.969733;stroke-linecap:square;stroke-dasharray:none;paint-or" +
        "der:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%281.0103246,0.01909201,-0.01272872,1.5154026,371.13406,49.503668%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.63144144,0.01193229,-0.00795531,0.94710951,391.37639,83.191282%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702848,0.00485704,-0.00323821,0.38552129,411.3799,116.48144%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20386.25048,139.29643%20h%2014.29696%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20449.59361,139.31094%20h%2014.29696%22%20/%3E%3C/g%3E%3Cg%20transform=%22rotate" +
        "%280.005,-455382.92,-3507604.8%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.969733;stroke-linecap:square;stroke-dasharray:none;paint-or" +
        "der:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%281.0103246,0.01909201,-0.01272872,1.5154026,371.13406,49.503668%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.63144144,0.01193229,-0.00795531,0.94710951,391.37639,83.191282%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702848,0.00485704,-0.00323821,0.38552129,411.3799,116.48144%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20386.25048,139.29643%20h%2014.29696%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20449.59361,139.31094%20h%2014.29696%22%20/%3E%3C/g%3E%3Cg%20transform=%22rotate" +
        "%280.005,-455462.32,-5327344.9%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.969733;stroke-linecap:square;stroke-dasharray:none;paint-or" +
        "der:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%281.0103246,0.01909201,-0.01272872,1.5154026,371.13406,49.503668%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.63144144,0.01193229,-0.00795531,0.94710951,391.37639,83.191282%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702848,0.00485704,-0.00323821,0.38552129,411.3799,116.48144%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20386.25048,139.29643%20h%2014.29696%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20449.59361,139.31094%20h%2014.29696%22%20/%3E%3C/g%3E%3Cg%20transform=%22rotate" +
        "%280.005,2280938.3,-5324957%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.969733;stroke-linecap:square;stroke-dasharray:none;paint-or" +
        "der:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%281.0103246,0.01909201,-0.01272872,1.5154026,371.13406,49.503668%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.63144144,0.01193229,-0.00795531,0.94710951,391.37639,83.191282%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702848,0.00485704,-0.00323821,0.38552129,411.3799,116.48144%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20386.25048,139.29643%20h%2014.29696%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20449.59361,139.31094%20h%2014.29696%22%20/%3E%3C/g%3E%3Cg%20transform=%22rotate" +
        "%280.005,2281017.7,-3505209.4%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.969733;stroke-linecap:square;stroke-dasharray:none;paint-or" +
        "der:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%281.0103246,0.01909201,-0.01272872,1.5154026,371.13406,49.503668%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.63144144,0.01193229,-0.00795531,0.94710951,391.37639,83.191282%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702848,0.00485704,-0.00323821,0.38552129,411.3799,116.48144%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20386.25048,139.29643%20h%2014.29696%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;fill-opacity:1;stroke:white;stroke-width:1.2;stroke-linecap:square;stroke-miterlimit:1." +
        "2;stroke-dasharray:none;stroke-opacity:1;paint-order:fill%20markers%20stroke%22%20d=%22m" +
        "%20449.59361,139.31094%20h%2014.29696%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate" +
        "%2819.392384,-151.11153%29%22%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:1.5516;stroke" +
        "-linecap:square;stroke-dasharray:none;paint-order:stroke%20fill%20markers%22%20d=%22M" +
        "%2053.672137,19.696201%2093.064533,58.103786%2054.656949,97.496182%2015.264553,59.088597%20Z%22" +
        "%20transform=%22matrix%280.6314404,0.01198739,-0.00803796,0.94710881,26.171735,214.36427%29%22%20/" +
        "%3E%3Cpath%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:squa" +
        "re;stroke-dasharray:none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201" +
        "%2093.064533,58.103786%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702806,0.00487947,-0.00327185,0.38552101,46.17234,247.65617%29%22%20/%3E%3C/g%3E%3Cg" +
        "%20transform=%22translate%28-59.780097,-270.50953%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.6314404,0.01198739,-0.00803796,0.94710881,26.171735,214.36427%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702806,0.00487947,-0.00327185,0.38552101,46.17234,247.65617%29%22%20/%3E%3C/g%3E%3Cg" +
        "%20transform=%22translate%28-59.780097,-151.11153%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.6314404,0.01198739,-0.00803796,0.94710881,26.171735,214.36427%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702806,0.00487947,-0.00327185,0.38552101,46.17234,247.65617%29%22%20/%3E%3C/g%3E%3Cg" +
        "%20transform=%22translate%2819.392384,-270.50953%29%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:1.5516;stroke-linecap:square;stroke-dasharray:none;paint-orde" +
        "r:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.6314404,0.01198739,-0.00803796,0.94710881,26.171735,214.36427%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:2.61288;stroke-linecap:square;stroke-dasharray" +
        ":none;paint-order:stroke%20fill%20markers%22%20d=%22M%2053.672137,19.696201%2093.064533,58.103786" +
        "%2054.656949,97.496182%2015.264553,59.088597%20Z%22%20transform=%22matrix" +
        "%280.25702806,0.00487947,-0.00327185,0.38552101,46.17234,247.65617%29%22%20/%3E%3C/g%3E%3C/g%3E" +
        "%3C/svg%3E\")",
    shippo:
        "url(\"data:image/svg+xml,%3Csvg%20width=%2260mm%22%20height=%2260mm%22%20viewBox=%220%200%2060%2060" +
        "%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%3E%3Ccircle%20style=%22fill:" +
        "%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-linecap:square;paint-order:stroke" +
        "%20fill%20markers%22%20cx=%2215%22%20cy=%2244.940159%22%20r=%2215%22%20/%3E%3Ccircle%20style=" +
        "%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-linecap:square;paint-order:strok" +
        "e%20fill%20markers%22%20cx=%2215%22%20cy=%2214.940415%22%20r=%2215%22%20/%3E%3Ccircle%20style=" +
        "%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-linecap:square;paint-order:strok" +
        "e%20fill%20markers%22%20cx=%2244.999794%22%20cy=%2244.940159%22%20r=%2215%22%20/%3E%3Ccircle" +
        "%20style=%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-linecap:square;paint-or" +
        "der:stroke%20fill%20markers%22%20cx=%2244.999794%22%20cy=%2214.940415%22%20r=%2215%22%20/%3E%3Cg" +
        "%20style=%22display:none%22%3E%3Cpath%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:" +
        "0;stroke-linecap:butt;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1;paint-order:strok" +
        "e%20fill%20markers%22%20d=%22M%207.2730991,-240.61835%20C%20-146.3269,-88.218348" +
        "%205.1197601,-87.62444%20-147.28024,-241.22444%20c%20-152.39999,-153.59999%20-152.9939,-2.15334" +
        "%200.60609,-154.55333%20153.6000008,-152.4%202.15334,-152.99391%20154.5533403,0.60609" +
        "%20152.3999997,153.6%20152.9939097,2.15334%20-0.6060912,154.55333%20z%22%20transform=%22matrix" +
        "%280,-0.03124566,0.03124566,0,39.942207,27.762457%29%22%20/%3E%3Cpath%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin:round;st" +
        "roke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22M" +
        "%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816%20-148.77973,-240.86066" +
        "%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661%20156.5688483,-153.12023" +
        "%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884%20154.8270336,3.29637" +
        "%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536929e-4,-0.03124354,0.03124354,-3.6536929e-4,9.916506,27.646335%29%22%20/%3E%3Cpath" +
        "%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin" +
        ":round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22M" +
        "%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816%20-148.77973,-240.86066" +
        "%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661%20156.5688483,-153.12023" +
        "%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884%20154.8270336,3.29637" +
        "%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536929e-4,-0.03124354,0.03124354,-3.6536929e-4,9.916506,-2.3497017%29%22%20/%3E%3Cpath" +
        "%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin" +
        ":round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22M" +
        "%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816%20-148.77973,-240.86066" +
        "%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661%20156.5688483,-153.12023" +
        "%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884%20154.8270336,3.29637" +
        "%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536929e-4,-0.03124354,0.03124354,-3.6536929e-4,39.916066,-2.3497017%29%22%20/%3E%3Cpath" +
        "%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin" +
        ":round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22M" +
        "%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816%20-148.77973,-240.86066" +
        "%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661%20156.5688483,-153.12023" +
        "%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884%20154.8270336,3.29637" +
        "%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536929e-4,-0.03124354,0.03124354,-3.6536929e-4,39.843352,57.647436%29%22%20/%3E%3Cpath" +
        "%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin" +
        ":round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22M" +
        "%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816%20-148.77973,-240.86066" +
        "%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661%20156.5688483,-153.12023" +
        "%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884%20154.8270336,3.29637" +
        "%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536929e-4,-0.03124354,0.03124354,-3.6536929e-4,9.916506,57.647436%29%22%20/%3E%3Cpath" +
        "%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin" +
        ":round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22M" +
        "%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816%20-148.77973,-240.86066" +
        "%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661%20156.5688483,-153.12023" +
        "%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884%20154.8270336,3.29637" +
        "%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536929e-4,-0.03124354,0.03124354,-3.6536929e-4,69.916221,57.647436%29%22%20/%3E%3Cpath" +
        "%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin" +
        ":round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22M" +
        "%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816%20-148.77973,-240.86066" +
        "%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661%20156.5688483,-153.12023" +
        "%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884%20154.8270336,3.29637" +
        "%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536929e-4,-0.03124354,0.03124354,-3.6536929e-4,69.916221,27.646335%29%22%20/%3E%3Cpath" +
        "%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin" +
        ":round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22%20d=%22M" +
        "%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816%20-148.77973,-240.86066" +
        "%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661%20156.5688483,-153.12023" +
        "%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884%20154.8270336,3.29637" +
        "%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536929e-4,-0.03124354,0.03124354,-3.6536929e-4,69.916221,-2.3497017%29%22%20/%3E%3Cpath" +
        "%20style=%22display:inline;fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;" +
        "stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22" +
        "%20d=%22M%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816" +
        "%20-148.77973,-240.86066%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661" +
        "%20156.5688483,-153.12023%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884" +
        "%20154.8270336,3.29637%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536842e-4,-0.03124354,0.03124354,-3.6536842e-4,54.915962,12.646464%29%22%20/%3E%3Cpath" +
        "%20style=%22display:inline;fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;" +
        "stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22" +
        "%20d=%22M%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816" +
        "%20-148.77973,-240.86066%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661" +
        "%20156.5688483,-153.12023%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884" +
        "%20154.8270336,3.29637%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536842e-4,-0.03124354,0.03124354,-3.6536842e-4,24.916167,12.646464%29%22%20/%3E%3Cpath" +
        "%20style=%22display:inline;fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;" +
        "stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22" +
        "%20d=%22M%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816" +
        "%20-148.77973,-240.86066%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661" +
        "%20156.5688483,-153.12023%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884" +
        "%20154.8270336,3.29637%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536842e-4,-0.03124354,0.03124354,-3.6536842e-4,54.915962,42.646208%29%22%20/%3E%3Cpath" +
        "%20style=%22display:inline;fill:white;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;" +
        "stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke%20fill%20markers%22" +
        "%20d=%22M%207.6368722,-239.11885%20C%20-148.93198,-85.998618%204.3404981,-84.291816" +
        "%20-148.77973,-240.86066%20c%20-153.12023,-156.56885%20-154.82704,-3.29638%201.74181,-156.41661" +
        "%20156.5688483,-153.12023%203.29638,-154.82703%20156.4166064,1.74182%20153.1202336,156.56884" +
        "%20154.8270336,3.29637%20-1.7418142,156.4166%20z%22%20transform=%22matrix" +
        "%28-3.6536842e-4,-0.03124354,0.03124354,-3.6536842e-4,24.916167,42.646208%29%22%20/%3E%3C/g%3E" +
        "%3Ccircle%20style=%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-linecap:square" +
        ";paint-order:stroke%20fill%20markers%22%20cx=%2230%22%20cy=%2229.940416%22%20r=%2215%22%20/%3E" +
        "%3Ccircle%20style=%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-linecap:square" +
        ";paint-order:stroke%20fill%20markers%22%20cx=%2260.000053%22%20cy=%2229.940416%22%20r=%2215%22%20/" +
        "%3E%3Ccircle%20style=%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-linecap:squ" +
        "are;paint-order:stroke%20fill%20markers%22%20cx=%220.00033864388%22%20cy=%2229.940416%22%20r=%2215" +
        "%22%20/%3E%3Ccircle%20style=%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-line" +
        "cap:square;paint-order:stroke%20fill%20markers%22%20cx=%2229.999899%22%20cy=%22-0.055750795%22%20r=" +
        "%2215%22%20/%3E%3Ccircle%20style=%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke" +
        "-linecap:square;paint-order:stroke%20fill%20markers%22%20cx=%2260.000053%22%20cy=%22-0.055750795%22" +
        "%20r=%2215%22%20/%3E%3Ccircle%20style=%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;s" +
        "troke-linecap:square;paint-order:stroke%20fill%20markers%22%20cx=%220.00033864388%22%20cy=" +
        "%22-0.055750795%22%20r=%2215%22%20/%3E%3Ccircle%20style=%22fill:" +
        "%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-linecap:square;paint-order:stroke" +
        "%20fill%20markers%22%20cx=%2260.000053%22%20cy=%2259.941387%22%20r=%2215%22%20/%3E%3Ccircle" +
        "%20style=%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-linecap:square;paint-or" +
        "der:stroke%20fill%20markers%22%20cx=%2229.927185%22%20cy=%2259.941387%22%20r=%2215%22%20/%3E" +
        "%3Ccircle%20style=%22fill:%23000000;fill-opacity:0;stroke:white;stroke-width:1;stroke-linecap:square" +
        ";paint-order:stroke%20fill%20markers%22%20cx=%220.00033864388%22%20cy=%2259.941387%22%20r=%2215%22" +
        "%20/%3E%3Cg%20style=%22display:none;fill:white;fill-opacity:1%22%3E%3Cg%20transform=%22matrix" +
        "%280.86228911,0,0,0.86228911,-26.941311,-2.9116861%29%22%20style=%22fill:white;fill-opacity:1%22%3E" +
        "%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814%20-7.74687,6.731476%200,0%20z%22" +
        "%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-41.94157,-17.911557%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-71.941364,-17.911557%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-71.941364,12.088187%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-41.94157,12.088187%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-56.941466,-2.9116761%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-57.01418,27.089415%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-26.941311,27.089415%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-26.941311,-32.907723%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-56.941466,-32.907723%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-86.941026,-2.9116861%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-86.941026,27.089415%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3Cg%20transform=" +
        "%22matrix%280.86228911,0,0,0.86228911,-86.941026,-32.907723%29%22%20style=" +
        "%22fill:white;fill-opacity:1%22%3E%3Cpath%20d=%22m%20100.82795,38.097444%20c%20-7.72041,-6.761814" +
        "%20-7.74687,6.731476%200,0%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;st" +
        "roke-linecap:square;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke" +
        "%22%20/%3E%3Cpath%20d=%22m%20100.82638,38.096537%20c%20-6.761813,7.720406%206.73147,7.746868%200,0" +
        "%20z%22%20style=%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke" +
        "-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.82452,38.095978%20c%207.72041,6.761814%207.74687,-6.731476%200,0%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3Cpath%20d=%22m" +
        "%20100.83517,32.300352%20c%20-1.686667,-0.0033%20-3.377115,1.926729%20-0.0114,5.800163" +
        "%203.3809,-3.860203%201.69803,-5.796855%200.0114,-5.800163%20z%22%20style=" +
        "%22fill:white;fill-opacity:1;stroke:none;stroke-width:1;stroke-linecap:square;stroke-miterlimit:1.2;" +
        "stroke-dasharray:none;paint-order:fill%20markers%20stroke%22%20/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg" +
        "%3E\")",
    kumi_kikko:
        "url(\"data:image/svg+xml,%3Csvg%20width=%2213.995mm%22%20height=%2216.459999mm%22%20viewBox=%220" +
        "%200%2013.995001%2016.459999%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs/%3E%3Cg%3E%3Cg" +
        "%20transform=%22translate%28-62.954986,-99.352366%29%22%20style=%22stroke:white;stroke-opacity:1%22" +
        "%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin" +
        ":miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers" +
        "%20stroke;stroke-opacity:1%22%20d=%22m%2064.01315,102.86981%205.925269,-3.444518" +
        "%20-0.01654,-6.961062%200.01757,6.961525%205.907588,3.424575%20-5.907588,-3.424575%20z%22%20/%3E" +
        "%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1" +
        ".2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.004871,101.60159%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/" +
        "%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimi" +
        "t:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2075.873858,101.60159%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/" +
        "%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimi" +
        "t:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2065.004872,103.52509%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22" +
        "%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linej" +
        "oin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill" +
        "%20markers;stroke-opacity:1%22%20d=%22m%2065.105383,103.53138%20-1.144746,-0.64874%20-0.0021,-2e-5" +
        "%206.12e-4,-1.37395%20-5.82e-4,1.37395%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2074.794893,103.54822%201.139964,-0.67263%200.0021,-2e-5%200.0023,-1.37395%20-0.0023,1.37395%20z" +
        "%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-li" +
        "nejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill" +
        "%20markers;stroke-opacity:1%22%20d=%22m%2068.884722,93.056122%201.050886,-0.609669%200.0011,-0.0018" +
        "%201.059031,0.6078%20-1.059046,-0.607774%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate" +
        "%28-62.954986,-91.126604%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.986051,3.416515%20-5.986051,-3.416515%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20h%20-2.9e-5%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stro" +
        "ke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2075.931736,101.63466%20-4.991994,-2.881806%202.9e-5,-5.69744%20-2.9e-5,5.69744%20h%202.9e-5%20z" +
        "%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-mi" +
        "terlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2065.004872,103.52509%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22" +
        "%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linej" +
        "oin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill" +
        "%20markers;stroke-opacity:1%22%20d=%22m%2065.090369,103.53481%20-1.123886,-0.64925%20-0.0021,-2e-5" +
        "%200.0093,-1.38272%20-0.0093,1.38272%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2074.894527,103.50951%201.068975,-0.62415%200.0021,-2e-5%20-0.01026,-1.40852%200.01023,1.40852%20z" +
        "%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-li" +
        "nejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill" +
        "%20markers;stroke-opacity:1%22%20d=%22m%2068.880484,93.081615%201.058637,-0.615525%200.0011,-0.0018" +
        "%201.052521,0.600678%20-1.052536,-0.600652%20z%22%20/%3E%3Cg%20transform=%22translate" +
        "%286.9750768,-12.294077%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2063.998165,102.80687%205.941288,-3.397081%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.124749,103.46515" +
        "%204.814239,-2.78881%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.183926,103.49913%20-1.208599,-0.68893%20-0.0021,-2e-5%200.02215,-1.30736" +
        "%20-0.02212,1.30736%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.753967,103.52191%201.151657,-0.62001" +
        "%200.0021,-2e-5%20-0.09708,-1.40026%200.09705,1.40026%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.884722,93.157904%201.036417,-0.691814%200.0011,-0.0018%201.0735,0.693583" +
        "%20-1.073515,-0.693557%20z%22%20/%3E%3C/g%3E%3C/g%3E%3Cg%20transform=%22translate" +
        "%28-62.954986,-107.5854%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.123987,103.52311%20-1.157651,-0.67995%20-0.0021,-2e-5%20-0.01081,-1.25041" +
        "%200.01084,1.25041%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-l" +
        "inecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.819899,103.53989%201.085725,-0.63799" +
        "%200.0021,-2e-5%20-0.01916,-1.3583%200.01913,1.3583%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.884722,93.157904%201.036417,-0.691814%200.0011,-0.0018%201.0735,0.693583" +
        "%20-1.073515,-0.693557%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%28-69.943314,-103.49169" +
        "%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.123987,103.52311%20-1.151657,-0.62001%20-0.0021,-2e-5%200.09708,-1.40026" +
        "%20-0.09705,1.40026%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.831284,103.52636%201.089325,-0.64544" +
        "%200.0021,-2e-5%200.0027,-1.28749%20-0.0027,1.28749%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.878875,93.076053%201.061901,-0.606862%200.0011,-0.0018%201.086936,0.624336" +
        "%20-1.086951,-0.62431%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%28-69.937098,-95.222545%29" +
        "%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2063.984211,102.81193%205.955242,-3.402141%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%200.0011,-5.69744%20-0.0011,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.099957,103.46721" +
        "%204.839031,-2.79087%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.148792,103.49004%20-1.176462,-0.68616%20-0.0021,-2e-5%20-0.0021,-1.30517" +
        "%200.0022,1.30517%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-li" +
        "necap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.753967,103.52191%201.162508,-0.68688" +
        "%200.0021,-2e-5%20-0.01045,-1.33339%200.01042,1.33339%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.874233,93.042522%201.057502,-0.63153%200.0011,-0.0018%201.067399,0.619704" +
        "%20-1.067414,-0.619678%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%28-55.946248,-95.222545" +
        "%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2063.99561,102.84058%205.943843,-3.415288%20-0.01757,-6.961062%200.01757,6.961525" +
        "%205.904665,3.409965%20-5.904665,-3.409965%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.880059,101.60986" +
        "%20-4.940317,-2.857006%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.112294,103.52311%20-1.175043,-0.68432%20-0.0021,-2e-5%200.02692,-1.33595" +
        "%20-0.02689,1.33595%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.806586,103.5453%201.128271,-0.65509" +
        "%200.0021,-2e-5%200.0023,-1.37103%20-0.0023,1.37103%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.884722,93.157904%201.036417,-0.691814%200.0011,-0.0018%201.0735,0.693583" +
        "%20-1.073515,-0.693557%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%28-87.263579,-104.41551" +
        "%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cg%20transform=%22translate" +
        "%2810.352516,21.487042%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.907588,3.424575%20-5.907588,-3.424575%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.123987,103.52311%20-1.151657,-0.62001%20-0.0021,-2e-5%200.09708,-1.40026" +
        "%20-0.09705,1.40026%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.794893,103.54822%201.139964,-0.67263" +
        "%200.0021,-2e-5%200.0023,-1.37395%20-0.0023,1.37395%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.884722,93.157904%201.036417,-0.691814%200.0011,-0.0018%201.0735,0.693583" +
        "%20-1.073515,-0.693557%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%2810.352516,29.712803%29" +
        "%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.123987,103.52311%20-1.151657,-0.62001%20-0.0021,-2e-5%200.09708,-1.40026" +
        "%20-0.09705,1.40026%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.753967,103.52191%201.151657,-0.62001" +
        "%200.0021,-2e-5%20-0.09708,-1.40026%200.09705,1.40026%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.880484,93.081615%201.058637,-0.615525%200.0011,-0.0018%201.052521,0.600678" +
        "%20-1.052536,-0.600652%20z%22%20/%3E%3Cg%20transform=%22translate%286.9750768,-12.294077%29%22" +
        "%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2063.998165,102.80687%205.941288,-3.397081%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.8951,3.408245%20-5.8951,-3.408245%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20h%202.9e-5%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stro" +
        "ke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2065.124749,103.46515%204.814239,-2.78881%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22" +
        "%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linej" +
        "oin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill" +
        "%20markers;stroke-opacity:1%22%20d=%22m%2065.183926,103.49913%20-1.208599,-0.68893%20-0.0021,-2e-5" +
        "%200.02215,-1.30736%20-0.02212,1.30736%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2074.766369,103.52191%201.143389,-0.67375%200.0021,-2e-5%20-0.0061,-1.34652%200.0061,1.34652%20z" +
        "%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-li" +
        "nejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill" +
        "%20markers;stroke-opacity:1%22%20d=%22m%2068.900549,93.055382%201.032992,-0.585158%200.0011,-0.0018" +
        "%201.061098,0.594364%20-1.061113,-0.594338%20z%22%20/%3E%3C/g%3E%3C/g%3E%3Cg%20transform=" +
        "%22translate%2810.352516,13.254009%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;str" +
        "oke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22" +
        "%20d=%22m%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.123987,103.52311%20-1.157651,-0.67995%20-0.0021,-2e-5%20-0.01081,-1.25041" +
        "%200.01084,1.25041%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-l" +
        "inecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.819899,103.53989%201.085725,-0.63799" +
        "%200.0021,-2e-5%20-0.01916,-1.3583%200.01913,1.3583%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.884722,93.103824%201.036417,-0.637734%200.0011,-0.0018%201.0735,0.651196%20-1.073515,-0.65117" +
        "%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%283.3641883,17.34772%29%22%20style=" +
        "%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.123987,103.52311%20-1.151657,-0.62001%20-0.0021,-2e-5%200.09708,-1.40026" +
        "%20-0.09705,1.40026%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.831284,103.52636%201.089325,-0.64544" +
        "%200.0021,-2e-5%200.0027,-1.28749%20-0.0027,1.28749%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.866118,93.102093%201.044686,-0.598796%200.0011,-0.0018%201.096237,0.635705" +
        "%20-1.096252,-0.635679%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%283.3704044,25.616863%29" +
        "%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.123987,103.52311%20-1.151657,-0.62001%20-0.0021,-2e-5%200.09708,-1.40026" +
        "%20-0.09705,1.40026%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.753967,103.52191%201.162508,-0.68688" +
        "%200.0021,-2e-5%20-0.01045,-1.33339%200.01042,1.33339%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.874233,93.042522%201.057502,-0.63153%200.0011,-0.0018%201.067399,0.682749" +
        "%20-1.067414,-0.682723%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%2817.361254,25.616863%29" +
        "%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2063.99561,102.84058%205.943843,-3.430791%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%20-0.03363,-5.69744%200.03363,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.112294,103.52311%20-1.175043,-0.68432%20-0.0021,-2e-5%200.02692,-1.33595" +
        "%20-0.02689,1.33595%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.753967,103.52191%201.151657,-0.62001" +
        "%200.0021,-2e-5%20-0.09708,-1.40026%200.09705,1.40026%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.884722,93.157904%201.022953,-0.666809%200.0011,-0.0018%201.086964,0.668578" +
        "%20-1.086979,-0.668552%20z%22%20/%3E%3C/g%3E%3C/g%3E%3Cg%20transform=%22translate" +
        "%28-59.291645,-104.33285%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cg%20transform=" +
        "%22translate%2810.352516,21.487042%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;str" +
        "oke-miterlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22" +
        "%20d=%22m%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.907588,3.424575%20-5.907588,-3.424575%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.106447,103.5465%20-1.146519,-0.67647%20-0.0021,-2e-5%20-0.0021,-1.36719" +
        "%200.0022,1.36719%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-li" +
        "necap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.794893,103.54822%201.139964,-0.67263" +
        "%200.0021,-2e-5%200.0023,-1.37395%20-0.0023,1.37395%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.884722,93.157904%201.036417,-0.691814%200.0011,-0.0018%201.0735,0.693583" +
        "%20-1.073515,-0.693557%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%2810.352516,29.712803%29" +
        "%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.123987,103.52311%20-1.151657,-0.62001%20-0.0021,-2e-5%200.09708,-1.40026" +
        "%20-0.09705,1.40026%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.753967,103.52191%201.151657,-0.62001" +
        "%200.0021,-2e-5%20-0.09708,-1.40026%200.09705,1.40026%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.880484,93.081615%201.058637,-0.615525%200.0011,-0.0018%201.052521,0.600678" +
        "%20-1.052536,-0.600652%20z%22%20/%3E%3Cg%20transform=%22translate%286.9750768,-12.294077%29%22" +
        "%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2063.998165,102.80687%205.941288,-3.397081%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.124749,103.46515" +
        "%204.814239,-2.78881%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.183926,103.49913%20-1.208599,-0.68893%20-0.0021,-2e-5%200.02215,-1.30736" +
        "%20-0.02212,1.30736%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.753967,103.52191%201.151657,-0.62001" +
        "%200.0021,-2e-5%20-0.09708,-1.40026%200.09705,1.40026%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.900549,93.055382%201.032992,-0.585158%200.0011,-0.0018%201.061098,0.594364" +
        "%20-1.061113,-0.594338%20z%22%20/%3E%3C/g%3E%3C/g%3E%3Cg%20transform=%22translate" +
        "%2810.352516,13.254009%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.123987,103.52311%20-1.157651,-0.67995%20-0.0021,-2e-5%20-0.01081,-1.25041" +
        "%200.01084,1.25041%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-l" +
        "inecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.819899,103.53989%201.085725,-0.63799" +
        "%200.0021,-2e-5%20-0.01916,-1.3583%200.01913,1.3583%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.884722,93.157904%201.036417,-0.691814%200.0011,-0.0018%201.0735,0.693583" +
        "%20-1.073515,-0.693557%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%283.3641883,17.34772%29" +
        "%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2063.992479,102.84087%205.930438,-3.41707%20-0.001,-6.95957%200.001,6.959458%205.874429,3.406182" +
        "%20-5.874429,-3.406182%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2063.955262,101.6388" +
        "%204.983725,-2.885954%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.913445,-2.84565%20v%200%20l%204.946546,2.8456%20-4.946546,-2.8456%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.107451,103.53965%20-1.192999,-0.70683%20-0.0021,-2e-5%20-0.0063,-1.31758" +
        "%200.0063,1.32171%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-li" +
        "necap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.831284,103.52636%201.089325,-0.64544" +
        "%200.0021,-2e-5%200.0027,-1.28749%20-0.0027,1.28749%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.917795,93.025612%200.999357,-0.581489%200.0011,-0.0018%201.073353,0.618399" +
        "%20-1.073368,-0.618373%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%283.3704044,25.616863%29" +
        "%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.460021%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.123987,103.52311%20-1.151657,-0.62001%20-0.0021,-2e-5%200.09708,-1.40026" +
        "%20-0.09705,1.40026%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.753967,103.52191%201.162508,-0.68688" +
        "%200.0021,-2e-5%20-0.01045,-1.33339%200.01042,1.33339%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.874233,93.042522%201.039932,-0.629463%200.0011,-0.0018%201.084969,0.680682" +
        "%20-1.084984,-0.680656%20z%22%20/%3E%3C/g%3E%3Cg%20transform=%22translate%2817.361254,25.616863%29" +
        "%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2063.99561,102.84058%205.943843,-3.430791%20-0.01757,-6.945559%200.01757,6.961525" +
        "%205.857893,3.404115%20-5.857893,-3.404115%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%20-2.9e-5,-5.69744%202.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2075.873858,101.60159" +
        "%20-4.934116,-2.848736%202.9e-5,-5.69744%20-2.9e-5,5.69744%20v%200%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2065.004872,103.52509" +
        "%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stro" +
        "ke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22" +
        "%20d=%22m%2065.112294,103.52311%20-1.175043,-0.68432%20-0.0021,-2e-5%200.02692,-1.33595" +
        "%20-0.02689,1.33595%20z%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-" +
        "linecap:round;stroke-linejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke" +
        "%20fill%20markers;stroke-opacity:1%22%20d=%22m%2074.753967,103.52191%201.151657,-0.62001" +
        "%200.0021,-2e-5%20-0.09708,-1.40026%200.09705,1.40026%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2068.884722,93.157904%201.036417,-0.691814%200.0011,-0.0018%201.0735,0.693583" +
        "%20-1.073515,-0.693557%20z%22%20/%3E%3C/g%3E%3C/g%3E%3Cg%20transform=%22translate" +
        "%28-62.964236,-82.893269%29%22%20style=%22stroke:white;stroke-opacity:1%22%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:square;stroke-linejoin:miter;stroke-miter" +
        "limit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2064.01315,102.86981%205.926303,-3.443485%200.0031,-6.962095%20-0.0031,6.961525" +
        "%205.939744,3.433345%20-5.939744,-3.433345%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stroke-dashar" +
        "ray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m%2064.004871,101.60159" +
        "%204.934116,-2.848744%200.0092,-5.69744%20-0.0092,5.69744%20h%200.0092%20z%22%20/%3E%3Cpath" +
        "%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-miterlimit:1.2;stro" +
        "ke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2075.926477,101.63667%20-4.986735,-2.883816%200.0093,-5.69744%20-0.0093,5.69744%20h%200.0093%20z" +
        "%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-mi" +
        "terlimit:1.2;stroke-dasharray:none;paint-order:fill%20markers%20stroke;stroke-opacity:1%22%20d=%22m" +
        "%2065.004872,103.52509%204.934116,-2.84875%20v%200%20l%204.934143,2.8487%20-4.934143,-2.8487%20z%22" +
        "%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linej" +
        "oin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill" +
        "%20markers;stroke-opacity:1%22%20d=%22m%2065.123987,103.52311%20-1.151657,-0.62001%20-0.0021,-2e-5" +
        "%200.09708,-1.40026%20-0.09705,1.40026%20z%22%20/%3E%3Cpath%20style=" +
        "%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-linejoin:miter;stroke-miterl" +
        "imit:1.2;stroke-dasharray:none;paint-order:stroke%20fill%20markers;stroke-opacity:1%22%20d=%22m" +
        "%2074.853358,103.58038%201.110731,-0.64925%200.0021,-2e-5%200.01693,-1.42072%20-0.01696,1.42072%20z" +
        "%22%20/%3E%3Cpath%20style=%22fill:none;stroke:white;stroke-width:0.25;stroke-linecap:round;stroke-li" +
        "nejoin:miter;stroke-miterlimit:1.2;stroke-dasharray:none;paint-order:stroke%20fill" +
        "%20markers;stroke-opacity:1%22%20d=%22m%2068.89299,93.058685%201.052954,-0.588461%200.0011,-0.0018" +
        "%201.044561,0.577828%20-1.044576,-0.577802%20z%22%20/%3E%3C/g%3E%3C/g%3E%3C/svg" +
        "%3E\")",
};

/**
 * Replace placeholder 'white' color in a pattern preset with the given color.
 * Handles both XML attribute format (stroke='white') and CSS style format (stroke:white).
 */
export function tintPattern(raw: string, color: string): string {
    const encoded = encodeURIComponent(color);
    return raw
        .replaceAll("stroke='white'", `stroke='${encoded}'`)
        .replaceAll("fill='white'", `fill='${encoded}'`)
        .replaceAll("stroke:white", `stroke:${encoded}`)
        .replaceAll("fill:white", `fill:${encoded}`);
}



