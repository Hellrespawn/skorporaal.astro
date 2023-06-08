import { useStore } from '@nanostores/react';
import { showRecipes } from '../stores/recipe.store';
import { useEffect, useState } from 'react';
import Dot from './Dot';

export default function BinaryClock() {
  const $showRecipes = useStore(showRecipes);

  const expectedBits = Math.ceil(Math.max(Math.log2(24), Math.log2(60)));
  const fps = 24;

  // Set up interval
  let interval: number;
  const [now, setNow] = useState<Date>(new Date());

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  useEffect(() => {
    interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000 / fps);

    return () => window.clearInterval(interval);
  });

  return (
    <div
      className="flex flex-col"
      onDoubleClick={() => showRecipes.set(!$showRecipes)}
    >
      {[hours, minutes, seconds].map((number, index) => (
        <div key={[number, index].join()} className="flex flex-row justify-end">
          {[...Array(expectedBits)].map((_, bit) => {
            return (
              <Dot
                key={[number, index, bit].join()}
                bg={
                  // largest to smallest
                  number & (1 << (expectedBits - bit))
                    ? 'bg-secondary-300 dark:bg-primary-500'
                    : 'bg-gray-400 dark:bg-gray-800'
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
