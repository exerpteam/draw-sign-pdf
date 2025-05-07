import { DefineComponent, ExtractPropTypes, Ref, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
declare const _default: DefineComponent<ExtractPropTypes<{
    originWidth: {
        type: NumberConstructor;
        required: true;
    };
    originHeight: {
        type: NumberConstructor;
        required: true;
    };
    width: {
        type: NumberConstructor;
        required: true;
    };
    height: {
        type: NumberConstructor;
        required: true;
    };
    x: {
        type: NumberConstructor;
        required: true;
    };
    y: {
        type: NumberConstructor;
        required: true;
    };
    pageScale: {
        type: NumberConstructor;
        default: number;
    };
    path: {
        type: StringConstructor;
        required: true;
    };
    zoomScale: {
        type: NumberConstructor;
        required: true;
    };
}>, {
    dx: Ref<number, number>;
    dy: Ref<number, number>;
    dw: Ref<number, number>;
    direction: Ref<string, string>;
    operation: Ref<string, string>;
    startX: Ref<number, number>;
    startY: Ref<number, number>;
    svg: Ref<SVGSVGElement | null, SVGSVGElement | null>;
    ratio: number;
    onDelete: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("delete" | "update")[], "delete" | "update", PublicProps, Readonly< ExtractPropTypes<{
    originWidth: {
        type: NumberConstructor;
        required: true;
    };
    originHeight: {
        type: NumberConstructor;
        required: true;
    };
    width: {
        type: NumberConstructor;
        required: true;
    };
    height: {
        type: NumberConstructor;
        required: true;
    };
    x: {
        type: NumberConstructor;
        required: true;
    };
    y: {
        type: NumberConstructor;
        required: true;
    };
    pageScale: {
        type: NumberConstructor;
        default: number;
    };
    path: {
        type: StringConstructor;
        required: true;
    };
    zoomScale: {
        type: NumberConstructor;
        required: true;
    };
}>> & Readonly<{
    onDelete?: ((...args: any[]) => any) | undefined;
    onUpdate?: ((...args: any[]) => any) | undefined;
}>, {
    pageScale: number;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
export default _default;
