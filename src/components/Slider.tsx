import { Slider } from '@/components/ui/slider'

interface Props {
  defaultValue: number
  max: number
  step: number
  onSlide: (value: number) => void
}

const ValueSlider = ({ defaultValue, max, step, onSlide }: Props) => {
  return (
    <Slider
      defaultValue={[defaultValue]}
      max={max}
      step={step}
      onValueChange={(value) => onSlide(value[0])}
    />
  )
}

export default ValueSlider
