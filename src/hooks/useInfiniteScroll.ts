import {useCallback, useEffect, RefObject, Dispatch, SetStateAction} from 'react'

type SetStartFunction = Dispatch<SetStateAction<number>>

export function useInfiniteScroll(
  ref: RefObject<HTMLDivElement>,
  isLoading: boolean,
  moreTask: boolean,
  setStart: SetStartFunction
) {
  const handleScroll = useCallback(() => {
    if (ref.current) {
      const container = ref.current
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight
      const clientHeight = container.clientHeight

      if (scrollHeight - scrollTop <= clientHeight + 150 && !isLoading && moreTask) {
        setStart(prevStart => prevStart + 1)
      }
    }
  }, [isLoading, moreTask, ref, setStart])

  useEffect(() => {
    const container = ref.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])
}
