import { TouchEventDetails, TouchMoveData } from '../utils/pdfTypes';
import { DefineComponent, ExtractPropTypes, ComputedRef, Ref, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
declare const _default: DefineComponent<ExtractPropTypes<{
    translations: {
        type: () => Record<string, string>;
        default: () => {};
    };
}>, {
    getTranslation: ComputedRef<{
        drawLabel: string;
        drawDone: string;
        drawCancel: string;
        additionalTextField: string;
    }>;
    signatureCanvas: Ref<HTMLDivElement | null, HTMLDivElement | null>;
    path: Ref<string, string>;
    finish: () => void;
    cancel: () => void;
    handlePanStart: (event: TouchEventDetails) => void;
    handlePanMove: (event: TouchMoveData) => void;
    handlePanEnd: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("cancel" | "finish")[], "cancel" | "finish", PublicProps, Readonly< ExtractPropTypes<{
    translations: {
        type: () => Record<string, string>;
        default: () => {};
    };
}>> & Readonly<{
    onCancel?: ((...args: any[]) => any) | undefined;
    onFinish?: ((...args: any[]) => any) | undefined;
}>, {
    translations: Record<string, string>;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
export default _default;
