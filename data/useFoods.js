
import { useEffect, useState, useCallback } from 'react';

// เปลี่ยนเป็น Raw URL จริงของไฟล์ foods.json
const FOODS_URL =
  'https://raw.githubusercontent.com/ชื่อบัญชี/ชื่อRepository/main/foods.json';

export default function useFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFoods = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(FOODS_URL);

      if (!response.ok) {
        throw new Error(`โหลดข้อมูลไม่สำเร็จ (${response.status})`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('รูปแบบข้อมูล foods.json ไม่ถูกต้อง');
      }

      setFoods(data);
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  return { foods, loading, error, reloadFoods: loadFoods };
}
