import React from 'react';
import { Box, Flex, Portal, space, Fade, themeColor, color } from '@blockstack/ui';
import { useDocSearchKeyboardEvents, DocSearchModal } from '@docsearch/react';

import { border } from '@common/utils';
import { Text } from '@components/typography';
import SearchIcon from 'mdi-react/SearchIcon';
import Router from 'next/router';
import Link from 'next/link';

const getLocalUrl = href => {
  const _url = new URL(href);
  const url = href
    .replace(_url.origin, '')
    .replace('#__next', '')
    .replace('.html', '')
    .replace('storage/clidocs', 'core/cmdLineRef');
  return url;
};
function Hit({ hit, children }: any) {
  const url = getLocalUrl(hit.url);
  return (
    <Link href={url} passHref>
      <a>{children}</a>
    </Link>
  );
}

const navigator = {
  navigate: async ({ suggestionUrl }: any) => {
    const url = getLocalUrl(suggestionUrl);
    return Router.push(url);
  },
};

const searchOptions = {
  apiKey: '9040ba6d60f5ecb36eafc26396288875',
  indexName: 'blockstack',
  navigator,
};
export const SearchBox: React.FC<any> = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = React.useCallback(
    function onOpen() {
      setIsOpen(true);
    },
    [setIsOpen]
  );

  const onClose = React.useCallback(
    function onClose() {
      setIsOpen(false);
    },
    [setIsOpen]
  );

  useDocSearchKeyboardEvents({ isOpen, onOpen, onClose });

  return (
    <>
      {
        <Portal>
          <Fade in={isOpen}>
            {styles => (
              <Box position="absolute" zIndex={9999} style={styles}>
                <DocSearchModal {...searchOptions} onClose={onClose} hitComponent={Hit} />
              </Box>
            )}
          </Fade>
        </Portal>
      }
      <Box minWidth="200px" display={['none', 'none', 'block', 'block']}>
        <Flex
          onClick={onOpen}
          border={border()}
          borderRadius="6px"
          px={space('base-tight')}
          py={space('tight')}
          align="center"
          _hover={{ borderColor: themeColor('blue.400'), cursor: 'pointer' }}
        >
          <Box mr={space('tight')}>
            <SearchIcon size="18px" />
          </Box>
          <Text fontSize={'14px'} color={color('text-caption')}>
            Search docs
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default SearchBox;