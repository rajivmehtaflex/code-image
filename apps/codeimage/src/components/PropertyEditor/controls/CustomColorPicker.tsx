import {AVAILABLE_COLORS, AVAILABLE_GRADIENTS} from '@codeimage/config';
import {getAssetsStore} from '@codeimage/store/assets/assets';
import {backgroundColorVar, Box, Text} from '@codeimage/ui';
import {IconButton, Popover, PopoverContent, PopoverTrigger} from '@codeui/kit';
import {useModality} from '@core/hooks/isMobile';
import {As} from '@kobalte/core';
import {DynamicSizedContainer} from '@ui/DynamicSizedContainer/DynamicSizedContainer';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {createSignal} from 'solid-js';
import {CloseIcon} from '../../Icons/CloseIcon';
import {ColorPickerPopover, ColorPickerPopoverProps} from './ColorPicker';
import * as styles from './CustomColorPicker.css';

export type CustomColorPickerProps = ColorPickerPopoverProps & {
  value: string | undefined;
  onChange: (value: string) => void;
};

export function CustomColorPicker(props: CustomColorPickerProps) {
  const modality = useModality();
  const [open, setOpen] = createSignal(false);
  const assetsStore = getAssetsStore();
  return (
    <Popover
      placement={modality === 'mobile' ? undefined : 'right-start'}
      open={open()}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <As component={'div'} class={styles.input}>
          <div
            class={styles.inputColor}
            style={assignInlineVars({
              [backgroundColorVar]: assetsStore.isAssetUrl(props.value)
                ? assetsStore.getAssetImageBrowserUrl(props.value)() ?? '#000'
                : props.value ?? '#000000',
            })}
          />
        </As>
      </PopoverTrigger>
      <PopoverContent variant={'bordered'} class={styles.popover}>
        <DynamicSizedContainer>
          <Box
            display={'flex'}
            justifyContent={'spaceBetween'}
            alignItems={'center'}
            marginBottom={4}
          >
            <Text weight={'semibold'}>Color</Text>
            <IconButton
              size={'xs'}
              aria-label={'Close'}
              theme={'secondary'}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <ColorPickerPopover
            value={props.value}
            onChange={props.onChange}
            colors={AVAILABLE_COLORS}
            gradientColors={AVAILABLE_GRADIENTS}
          />
        </DynamicSizedContainer>
      </PopoverContent>
    </Popover>
  );
}
