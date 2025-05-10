import { DefineComponent, ExtractPropTypes, ComputedRef, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
declare const _default: DefineComponent<ExtractPropTypes<{
    translations: {
        type: () => Record<string, string>;
        default: () => {};
    };
    type: {
        type: () => "warning" | "confirm";
        default: string;
    };
}>, {
    getTranslation: ComputedRef<{
        title: string;
        desc: string;
        close: string;
        saveChanges?: undefined;
    } | {
        title: string;
        desc: string;
        close: string;
        saveChanges: string;
    }>;
    closeModal: () => void;
    finish: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("cancel" | "finish")[], "cancel" | "finish", PublicProps, Readonly< ExtractPropTypes<{
    translations: {
        type: () => Record<string, string>;
        default: () => {};
    };
    type: {
        type: () => "warning" | "confirm";
        default: string;
    };
}>> & Readonly<{
    onCancel?: ((...args: any[]) => any) | undefined;
    onFinish?: ((...args: any[]) => any) | undefined;
}>, {
    type: "warning" | "confirm";
    translations: Record<string, string>;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
export default _default;
