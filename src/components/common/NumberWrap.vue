<template>
    <div class="number-wrap">{{printVal.toString()}}</div>
</template>

<script>
    export default {
        name: "NumberWrap",
        props: {
            startVal: {
                type: [String, Number],
                default: ''
            },
            endVal: {
                type: [String, Number],
                default: ''
            },
            speed: {
                type: [String, Number],

            },
            decimals: {
                type: [String, Number],
                default: 0
            },
            isReverse: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                start: +this.startVal,
                end: +this.endVal,
                formatSpeed: +this.speed || +this.endVal/80,
            };
        },
        computed: {
            formatDecimals() {
                // 是否整数
                let formatDecimals = this.decimals > 0 ? this.decimals : 0;
                return formatDecimals
            },
            decimalsLen() {
                // 1 = 0.001 * decimalsLen(x);
                let decimalsLen = Math.pow(10, this.formatDecimals);
                return decimalsLen;
            },
            printVal() {
                // 保留几位小数
                let start = (
                    parseInt(this.start * this.decimalsLen) / this.decimalsLen
                ).toFixed(this.formatDecimals);
                return start
            }
        },
        watch: {},
        methods: {
            accumulativeMachine() {
                setTimeout(() => {
                    if (this.isReverse) {
                        let decimals = this.formatDecimals === 0 ? 0 : 1 / this.decimalsLen;
                        let formatSpeed = this.formatSpeed / this.decimalsLen + decimals;
                        this.start -= formatSpeed;
                        if (this.printVal <= this.end) {
                            this.start = this.end;
                            return
                        }
                    } else {
                        let decimals = this.formatDecimals === 0 ? 0 : 1 / this.decimalsLen;
                        let formatSpeed = this.formatSpeed / this.decimalsLen + decimals;
                        this.start += formatSpeed;
                        if (this.printVal >= this.end) {
                            this.start = this.end;
                            return
                        }
                    }
                    this.accumulativeMachine();
                }, 8);
            }
        },
        created() {},
        mounted() {
            this.$nextTick(() => {
                this.accumulativeMachine();
            });
        }
    }
</script>

<style scoped>
    .number-wrap{
        font-family: Arial-BoldMT;
        font-size: 20px;
        color: #66E2FB;
        /*letter-spacing: 2.67px;*/
        display: block;
        line-height:16px;
        float: left;
        background: #26a7ff38;
        margin-right: 5px;
        padding: 4px;
        text-align: center;
    }
</style>
